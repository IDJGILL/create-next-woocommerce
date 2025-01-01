import { createRPCContext } from "@/app/api/rpc/config"
import { rpcRouter } from "@/app/api/rpc/root"
import { getStoreIDFromAPIRoute } from "@/app/api/rpc/utils"
import { env } from "@/env"

import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { type NextRequest } from "next/server"

const handler = (req: NextRequest) => {
  return fetchRequestHandler({
    req,
    endpoint: "/api/rpc",
    router: rpcRouter,
    createContext: () => {
      const storeId = getStoreIDFromAPIRoute(req.headers)

      const requestHeaders = new Headers(req.headers)

      if (storeId) requestHeaders.set("x-store-id", storeId)

      return createRPCContext({ headers: requestHeaders })
    },
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`)
          }
        : undefined,
  })
}

export { handler as GET, handler as POST }
