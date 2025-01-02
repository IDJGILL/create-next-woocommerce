'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { type BaseSyntheticEvent } from 'react'
import {
  Controller,
  type ControllerProps,
  type DefaultValues,
  type FieldPath,
  type FieldValues,
  FormProvider,
  type UseFormReturn,
  useForm as useFormCore,
} from 'react-hook-form'
import { type ZodSchema } from 'zod'

interface FormProps<TFieldValues extends FieldValues = FieldValues> {
  className?: string
  form: UseFormReturn<TFieldValues>
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  children: React.ReactNode
}

function Form<TFieldValues extends FieldValues = FieldValues>({ ...props }: FormProps<TFieldValues>) {
  return (
    <FormProvider {...props.form}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          props.onSubmit?.(e)
        }}
        className={props.className}
      >
        {props.children}
      </form>
    </FormProvider>
  )
}

function FormField<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
  ...props
}: ControllerProps<TFieldValues, TName>) {
  return <Controller {...props} />
}

interface UseFormOptions<TFieldValues extends FieldValues> {
  schema: ZodSchema<TFieldValues>
  onSubmit?: (data: ZodSchema<TFieldValues>['_output']) => void
  initialValues?: Partial<TFieldValues>
  logger?: boolean
}

function useForm<TFieldValues extends FieldValues>(options: UseFormOptions<TFieldValues>) {
  const form = useFormCore<ZodSchema<TFieldValues>['_input']>({
    resolver: zodResolver(options.schema),
    defaultValues: options.initialValues as DefaultValues<TFieldValues>,
  })

  const handleSubmit = () => {
    return form.handleSubmit((input) => {
      if (options.logger) console.table(input)

      return options.onSubmit?.(input)
    })()
  }

  const hasUnSavedChanges = !!Object.keys(form.formState.dirtyFields).length

  const discardChanges = () => {
    form.reset(form.formState.defaultValues as TFieldValues)
  }

  const handleFormDefaults = (e?: BaseSyntheticEvent) => e?.preventDefault()

  const commitChanges = (items?: Partial<ZodSchema<TFieldValues>['_input']>) => form.reset({ ...form.getValues(), ...items })

  const handleReset = () => form.reset()

  if (options.logger) {
    const errors = form.formState.errors

    if (Object.keys(errors).length) {
      console.log('Errors: ############################################################')
      console.table(errors, ['name', 'message', 'type'])
      console.log('Errors: ############################################################')
    }
  }

  return {
    form,
    handleSubmit,
    hasUnSavedChanges,
    discardChanges,
    handleFormDefaults,
    commitChanges,
    handleReset,
  }
}

export type UseFormReturnType<TFieldValues extends FieldValues> = ReturnType<typeof useForm<TFieldValues>>

export { Form, FormField, useForm, type UseFormOptions }
