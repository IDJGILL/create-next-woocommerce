import "server-only"

import { createRPCContext } from "./config"
import { createQueryClient } from "./options"
import { type RPCRouter, createCaller } from "./root"
import { getStoreIDFromRSC } from "./utils"

import { createHydrationHelpers } from "@trpc/react-query/rsc"
import { headers as nextHeaders } from "next/headers"
import { cache } from "react"

const storeRSCHeaders = async () => {
  const headers = new Headers(await nextHeaders())

  const storeId = getStoreIDFromRSC(headers)

  if (storeId) headers.set("x-store-id", storeId)

  headers.set("x-rpc-source", "rsc")

  return headers
}

const createContext = cache(async () => {
  return createRPCContext({ headers: await storeRSCHeaders() })
})

const caller = createCaller(createContext)

const getQueryClient = cache(createQueryClient)

export const { trpc: api } = createHydrationHelpers<RPCRouter>(caller, getQueryClient)
