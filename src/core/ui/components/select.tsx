import { FormField } from './form'
import { cn } from '@/core/shared/utils'

import { Box, Select as RadixSelect, Text } from '@radix-ui/themes'
import { type Responsive } from '@radix-ui/themes/dist/esm/props/prop-def.js'
import { forwardRef, useId } from 'react'
import { type ControllerProps, type FieldPath, type FieldValues, type UseFormReturn } from 'react-hook-form'

export interface SelectProps {
  label?: string
  value?: string
  defaultValue?: string
  onValueChange?(value: string): void
  defaultOpen?: boolean
  disabled?: boolean
  className?: string
  error?: string
  placeholder?: string
  size?: Responsive<'1' | '2' | '3'>
  options: {
    label: React.ReactNode
    value: string
  }[]
}

const Select = forwardRef<HTMLButtonElement, SelectProps>(({ className, label, placeholder, error, options, ...props }, ref) => {
  const id = useId()

  return (
    <Box className={cn('min-w-48', className)}>
      {label && <label htmlFor={id}>{label}</label>}

      <RadixSelect.Root {...props}>
        <RadixSelect.Trigger
          ref={ref}
          id={id}
          className={cn(
            'w-full outline-2 outline-offset-[-1px] outline-[var(--focus-8)] hover:[box-shadow:inset_0_0_0_1px_var(--gray-a7)] data-[state=open]:outline data-[state=open]:[box-shadow:inset_0_0_0_0px_var(--red-a11)]',
            label && 'mt-1',
            error && 'outline-2 outline-[var(--red-a6)] [box-shadow:inset_0_0_0_1px_var(--red-a11)]'
          )}
          placeholder={placeholder}
        />

        <RadixSelect.Content position="popper" className="max-h-[300px] w-full max-w-[var(--radix-select-trigger-width)] sm:max-w-full">
          {options.map(({ label, value }) => (
            <RadixSelect.Item key={value} value={value}>
              {label}
            </RadixSelect.Item>
          ))}
        </RadixSelect.Content>
      </RadixSelect.Root>

      {error && (
        <Text size="1" color="red" className="mt-2 flex items-center gap-1">
          {error}
        </Text>
      )}
    </Box>
  )
})

Select.displayName = 'Select'

type FormSelectProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
  form: UseFormReturn<TFieldValues>
  name: ControllerProps<TFieldValues, TName>['name']
} & Omit<SelectProps, 'name'>

function FormSelect<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
  ...props
}: FormSelectProps<TFieldValues, TName>) {
  const { name, form, ...rest } = props

  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Select
          {...rest}
          value={field.value}
          disabled={field.disabled}
          onValueChange={(value) => {
            field.onChange(value)
            rest.onValueChange?.(value)
          }}
          error={fieldState.error?.message}
        />
      )}
    />
  )
}

export { Select, FormSelect }
