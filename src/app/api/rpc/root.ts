import { createCallerFactory, createRPCRouter, publicProcedure } from './config'
import { client } from '@/core/shared/graphql-client'

const GET_PRODUCTS = `
query GetProducts {
  products {
    edges {
      cursor
      node {
        id
				title
        slug
        type
      }
    }
  }
}
`

export const rpcRouter = createRPCRouter({
  test: publicProcedure.mutation(async () => {
    const res = await client<{ products: { edges: { node: { id: string; title: string; slug: string; type: string } }[] } }>(GET_PRODUCTS)

    return res.data
  }),
})

export type RPCRouter = typeof rpcRouter

export const createCaller = createCallerFactory(rpcRouter)
