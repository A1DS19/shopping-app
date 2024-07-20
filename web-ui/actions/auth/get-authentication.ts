'use server'

import { cookies } from 'next/headers'

import { AUTHENTICATION } from '@/constants/cookie-names'

export default async function getAuthentication() {
  return cookies().get(AUTHENTICATION)
}
