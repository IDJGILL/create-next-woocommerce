import { auth } from '@/core/authentication'

import { TRPCError, initTRPC } from '@trpc/server'
import superjson from 'superjson'
import { ZodError } from 'zod'

export const createRPCContext = async (opts: { headers: Headers }) => {
  return {
    ...opts,
  }
}

const t = initTRPC.context<typeof createRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

const coreMiddleware = t.middleware(async ({ next }) => {
  // Handle rate limiting and other stuff here...

  return next()
})

const authMiddleware = coreMiddleware.unstable_pipe(async ({ next }) => {
  const session = await auth()

  if (!session) throw new TRPCError({ code: 'UNAUTHORIZED' })

  return next({ ctx: { session } })
})

export const publicProcedure = t.procedure.use(coreMiddleware)

export const protectedProcedure = t.procedure.use(authMiddleware)

export const createRPCRouter = t.router

export const createCallerFactory = t.createCallerFactory
