import { $SignInSchema } from './schema'
import { getUser, verifyUser } from './utils'

import { type DefaultSession, type NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
    } & DefaultSession['user']
  }

  // interface User {
  // }
}

export const authConfig = {
  providers: [
    Credentials({
      credentials: { email: { label: 'Email', type: 'email' }, password: { label: 'Password', type: 'password' } },
      authorize: async (credentials) => {
        const { data, error } = $SignInSchema.safeParse(credentials)

        if (error) return null

        const result = await verifyUser(data.email, data.password)

        if (!result) return null

        const user = await getUser('EMAIL', data.email)

        if (user === null) return null

        return {
          id: user.databaseId.toString(),
          name: user.firstName + ' ' + user.lastName,
          email: user.email,
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
} satisfies NextAuthConfig
