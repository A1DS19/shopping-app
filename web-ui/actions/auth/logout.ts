'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { AUTHENTICATION } from '@/constants/cookie-names'

export default async function logout() {
  cookies().delete(AUTHENTICATION)
  redirect('/auth/login')
}
