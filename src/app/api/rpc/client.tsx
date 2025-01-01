"use client"

import { type RPCRouter } from "./root"

import { createTRPCReact } from "@trpc/react-query"
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server"

export const api = createTRPCReact<RPCRouter>()

export type RPC = {
  data: inferRouterOutputs<RPCRouter>
  input: inferRouterInputs<RPCRouter>
}
