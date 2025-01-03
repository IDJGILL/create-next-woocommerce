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
  initial?: Partial<TFieldValues>
  logger?: boolean
}

function useCreateForm<TFieldValues extends FieldValues>(options: UseFormOptions<TFieldValues>) {
  const form = useFormCore<ZodSchema<TFieldValues>['_input']>({
    resolver: zodResolver(options.schema),
    defaultValues: options.initial as DefaultValues<TFieldValues>,
  })

  const submit = () => {
    return form.handleSubmit((input) => {
      if (options.logger) console.table(input)

      return options.onSubmit?.(input)
    })()
  }

  const isUnSaved = !!Object.keys(form.formState.dirtyFields).length

  const discard = () => {
    form.reset(form.formState.defaultValues as TFieldValues)
  }

  const commit = (items?: Partial<ZodSchema<TFieldValues>['_input']>) => form.reset({ ...form.getValues(), ...items })

  const rest = () => form.reset()

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
    submit,
    isUnSaved,
    discard,
    commit,
    rest,
  }
}

export type UseFormReturnType<TFieldValues extends FieldValues> = ReturnType<typeof useCreateForm<TFieldValues>>

export { Form, FormField, useCreateForm, type UseFormOptions }
