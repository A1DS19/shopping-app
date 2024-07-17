import { cookies } from 'next/headers'

import { env } from '@/constants/env'

import { getErrorMessage } from './errors'

const getHeaders = () => ({
  Cookie: cookies().toString()
})

export const post = async (path: string, formData: FormData) => {
  const response = await fetch(`${env.API_URL}/${path}`, {
    method: 'POST',
    body: JSON.stringify(Object.fromEntries(formData)),
    headers: {
      'Content-Type': 'application/json',
      ...getHeaders()
    }
  })

  const parsedRes = await response.json()

  if (!response.ok) {
    return { error: getErrorMessage(parsedRes) }
  }

  return { error: '' }
}

export const get = async (path: string) => {
  const response = await fetch(`${env.API_URL}/${path}`, {
    headers: {
      ...getHeaders()
    }
  })

  return await response.json()
}
