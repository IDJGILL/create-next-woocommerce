import { FormField } from './form'
import { cn } from '@/core/shared/utils'

import { Box, Flex, Text, TextField } from '@radix-ui/themes'
import { forwardRef, useId } from 'react'
import { type ControllerProps, type FieldPath, type FieldValues, type UseFormReturn } from 'react-hook-form'

export interface InputProps
  extends Remove<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'color' | 'size' | 'value' | 'defaultValue' | 'className'> {
  name?: string
  placeholder?: string
  value?: string | number | undefined
  defaultValue?: string | number | undefined
  startContent?: React.ReactNode
  endContent?: React.ReactNode
  containerEndContent?: React.ReactNode
  containerStartContent?: React.ReactNode
  label?: React.ReactNode
  classNames?: Partial<{
    input: string
    label: string
    startContent: string
    endContent: string
    wrapper: string
    containerStartContent: string
    containerEndContent: string
    container: string
  }>
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, startContent, error, classNames, endContent, containerStartContent, containerEndContent, ...props }, ref) => {
    const id = useId()

    return (
      <Box className={cn('text-2 group w-full min-w-48', classNames?.wrapper)}>
        {label && (
          <label htmlFor={id} className={cn(classNames?.label)}>
            {label}
          </label>
        )}

        <Flex align="center" gap="2" width="100%" className={cn(label && 'mt-1', classNames?.container)}>
          {containerStartContent}

          <TextField.Root
            id={id}
            type="text"
            aria-invalid={!!error}
            className={cn(
              'flex-1 overflow-hidden',
              error && '[--text-field-focus-color:var(--red-a6)] [box-shadow:inset_0_0_0_var(--text-field-border-width)_var(--red-a11)]',
              classNames?.input
            )}
            ref={ref}
            {...props}
          >
            {startContent && (
              <TextField.Slot side="left" className={cn('rounded-l-1 ml-[0px]', classNames?.startContent)}>
                {startContent}
              </TextField.Slot>
            )}
            {endContent && (
              <TextField.Slot side="right" className={cn('rounded-r-1 mr-[0px]', classNames?.endContent)}>
                {endContent}
              </TextField.Slot>
            )}
          </TextField.Root>

          {containerEndContent}
        </Flex>

        {error && (
          <Text size="1" color="red" className="mt-2 flex items-center gap-1">
            {error}
          </Text>
        )}
      </Box>
    )
  }
)

Input.displayName = 'Input'

type FormInputProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
  form: UseFormReturn<TFieldValues>
  name: ControllerProps<TFieldValues, TName>['name']
} & Select<InputProps, 'placeholder' | 'startContent' | 'endContent' | 'label' | 'classNames'>

function FormInput<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
  ...props
}: FormInputProps<TFieldValues, TName>) {
  const { name, form, ...rest } = props

  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field, fieldState }) => <Input {...field} {...rest} error={fieldState.error?.message} />}
    />
  )
}

export { Input, FormInput }
