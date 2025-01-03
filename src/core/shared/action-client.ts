import 'server-only'

import { createMiddleware, createSafeActionClient } from 'next-safe-action'

export class ActionError extends Error {}

const baseMiddleware = createMiddleware().define(({ next }) => {
  return next({
    ctx: {
      hello: 'world',
    },
  })
})

const authMiddleware = createMiddleware().define(({ next, ctx }) => {
  return next({
    ctx: {
      ...ctx,
      auth: true,
    },
  })
})

const handleServerError = (error: Error) => {
  if (error instanceof ActionError) return error.message

  return 'Something went wrong.'
}

export const publicAction = createSafeActionClient({ handleServerError }).use(baseMiddleware)

export const privateAction = createSafeActionClient({ handleServerError }).use(baseMiddleware).use(authMiddleware)
