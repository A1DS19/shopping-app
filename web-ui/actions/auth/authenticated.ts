import { cookies } from 'next/headers'

import { AUTHENTICATION } from '@/constants/cookie-names'

export default function authenticated() {
  return !!cookies().get(AUTHENTICATION)?.value
}
