'use client'

import { api } from './api/rpc/client'

import { Button } from '@radix-ui/themes'

export default function Home() {
  const { mutate, isPending, data } = api.test.useMutation()

  console.log(data)

  return (
    <div>
      <Button onClick={() => mutate()} loading={isPending}>
        Hello
      </Button>
    </div>
  )
}
