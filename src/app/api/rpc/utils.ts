export const getStoreIDFromRSC = (headers: Headers): Nullish<string> => {
  const match = /\/store\/([^\/]+)/.exec(headers.get('x-next-pathname') ?? '')

  return match ? match[1] : null
}

export const getStoreIDFromAPIRoute = (headers: Headers): Nullish<string> => {
  const match = /\/store\/([^\/]+)/.exec(headers.get('referer') ?? '')

  return match ? match[1] : null
}
