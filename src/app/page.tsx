'use client'

import { useSignUp } from '@/core/authentication/hooks'
import { Form } from '@/core/ui/components/form'
import { FormInput } from '@/core/ui/components/input'

import { Button } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { form, submit, isUnSaved, isPending } = useSignUp()
  const { data } = useSession()

  return (
    <div>
      {JSON.stringify(data)}

      <Form form={form}>
        <FormInput form={form} name="name" label="Name" />
        <FormInput form={form} name="email" label="Email" />
        <FormInput form={form} name="password" label="Password" />
        <Button onClick={submit} disabled={!isUnSaved || isPending} loading={isPending}>
          Submit
        </Button>
      </Form>
    </div>
  )
}
