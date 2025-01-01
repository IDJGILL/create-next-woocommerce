import { createCallerFactory, createRPCRouter } from './config'

export const rpcRouter = createRPCRouter({
  test: {},
})

export type RPCRouter = typeof rpcRouter

export const createCaller = createCallerFactory(rpcRouter)
