import { cookies } from 'next/headers'

import { env } from '@/constants/env'

import { getErrorMessage } from './errors'

export const getHeaders = () => ({
  Cookie: cookies().toString()
})

export const post = async (path: string, data: FormData | object) => {
  const body = data instanceof FormData ? Object.fromEntries(data) : data
  const response = await fetch(`${env.API_URL}/${path}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      ...getHeaders()
    }
  })

  const parsedRes = await response.json()

  if (!response.ok) {
    return { error: getErrorMessage(parsedRes) }
  }

  return { error: '', data: parsedRes }
}

export const get = async <T>(path: string, tags?: string[]) => {
  const response = await fetch(`${env.API_URL}/${path}`, {
    headers: {
      ...getHeaders()
    },
    next: {
      tags: tags
    }
  })

  return (await response.json()) as T
}
