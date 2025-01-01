import { env } from '@/env'

export const client = async <TData = unknown, TVariables = void>(query: string, variables?: TVariables) => {
  const credentials = Buffer.from(`${env.WORDPRESS_APP_USERNAME}:${env.WORDPRESS_APP_PASSWORD}`).toString('base64')

  const authorization = 'Basic ' + credentials

  const endpoint = `https://${env.WORDPRESS_DOMAIN}/graphql`

  const res = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({ query, variables }),
    headers: { 'Content-Type': 'application/json', Authorization: authorization },
  })

  return res.json() as Promise<{ data: TData }>
}
