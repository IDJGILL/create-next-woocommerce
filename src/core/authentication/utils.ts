import 'server-only'

import { env } from '@/env'

import { client } from '../shared/graphql-client'
import { safeAsync } from '../shared/utils'

type UserIdType = 'DATABASE_ID' | 'EMAIL' | 'USERNAME'

export const getUser = async (idType: UserIdType, email: string) => {
  type User = { databaseId: number; firstName: string; lastName: string; email: string; username: string }

  const GET_USER = `
    query ($id: ID!, $idType: UserNodeIdTypeEnum) {
        user(id: $id, idType: $idType) {
            databaseId
            firstName
            lastName
            email
            username
        }
    }
    `

  const [errorA, responseA] = await safeAsync(client<{ user: User | null }>(GET_USER, { id: email, idType }))

  if (errorA) throw new Error('Internal server error.')

  return responseA.data.user
}

export const verifyUser = async (username: string, password: string): Promise<boolean> => {
  type GetUserAuthToken =
    | {
        token: string
        user_display_name: string
        user_email: string
        user_nicename: string
      }
    | {
        code: '[jwt_auth] incorrect_password' | '[jwt_auth] invalid_email'
        data: { status: 403 }
        message: 'Invalid Credentials.'
      }

  const endpoint = `https://${env.WORDPRESS_DOMAIN}/wp-json/jwt-auth/v1/token`

  const params = new URLSearchParams({ username, password })

  const response = await fetch(`${endpoint}?${params.toString()}`, { method: 'POST' })

  //   if (response.status !== 200) throw new Error('Something went wrong.')

  const data = (await response.json()) as GetUserAuthToken

  console.log({ data })

  if ('code' in data && data.code === '[jwt_auth] invalid_email') return false

  if ('code' in data && data.code === '[jwt_auth] incorrect_password') return false

  return true
}
