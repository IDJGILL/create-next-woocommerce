'use server'

import 'server-only'

import { $SignInSchema, $SignUpSchema } from './schema'
import { getUser } from './utils'

import { authSignIn } from '.'
import { ActionError, publicAction } from '../shared/action-client'
import { client } from '../shared/graphql-client'
import { safeAsync } from '../shared/utils'

export const signInAction = publicAction.schema($SignInSchema).action(async ({ parsedInput: input }) => {
  //
})

export const signUpAction = publicAction.schema($SignUpSchema).action(async ({ parsedInput: input }) => {
  const CREATE_USER = `
    mutation ($username: String!, $firstName: String, $lastName: String, $email: String, $password: String) {
        createUser(
            input: {username: $username, firstName: $firstName, lastName: $lastName, email: $email, password: $password}
        ) {
            user {
            databaseId
            firstName
            lastName
            email
            }
        }
    }
    `

  const names = input.name.split(' ')
  const firstName = names[0]
  const lastName = names.slice(1).join(' ')

  const user = await getUser('EMAIL', input.email)

  if (user !== null) throw new ActionError('User already exists.')

  const [error] = await safeAsync(
    client<{
      user: { databaseId: number; firstName: string; lastName: string; email: string }
    }>(CREATE_USER, {
      firstName,
      lastName,
      username: input.email,
      email: input.email,
      password: input.password,
    })
  )

  if (error) throw new ActionError('Internal server error.')

  // Login user and redirect to home or previous page

  await authSignIn('credentials', { email: input.email, password: input.password })
})
