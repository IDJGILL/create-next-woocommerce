"use client"

import { api } from "@/app/api/rpc/client"
import { createQueryClient } from "@/app/api/rpc/options"

import { type QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client"
import { useState } from "react"
import SuperJSON from "superjson"

let clientQueryClientSingleton: QueryClient | undefined = undefined

const getQueryClient = () => {
  if (typeof window === "undefined") return createQueryClient()

  return (clientQueryClientSingleton ??= createQueryClient())
}

interface RPCProviderProps {
  children: React.ReactNode
}

export default function RPCProvider(props: RPCProviderProps) {
  const queryClient = getQueryClient()

  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (op) => process.env.NODE_ENV === "development" || (op.direction === "down" && op.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          transformer: SuperJSON,
          url: getBaseUrl() + "/api/rpc",
          headers: () => {
            const requestHeaders = new Headers()

            requestHeaders.set("x-rpc-source", "client")

            return requestHeaders
          },
        }),
      ],
    })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  )
}

function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}
