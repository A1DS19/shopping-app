'use server'

import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { env } from '@/constants/env'
import { FormError } from '@/types/form-error'
import { getErrorMessage } from '@/utils/errors'

export default async function login(_prevState: FormError, formData: FormData) {
  const response = await fetch(`${env.API_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(Object.fromEntries(formData)),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const parsedRes = await response.json()

  if (!response.ok) {
    return { error: getErrorMessage(parsedRes) }
  }

  setAuthCookie(response)
  redirect('/')
}

/*
  The setAuthCookie function is used to set the authentication cookie in the browser. 
  The function takes a Response object as an argument and extracts the token from the Set-Cookie header. 
  It then sets the cookie in the browser with the token value, secure flag, httpOnly flag, and expiration date.
*/
const setAuthCookie = (res: Response) => {
  const setCookieHeader = res.headers.get('Set-Cookie')

  if (setCookieHeader) {
    const token = setCookieHeader.split(';')[0].split('=')[1]
    cookies().set({
      name: 'Authentication',
      value: token,
      secure: env.NODE_ENV === 'production',
      httpOnly: true,
      expires: new Date(jwtDecode(token).exp! * 1000)
    })
  }
}
