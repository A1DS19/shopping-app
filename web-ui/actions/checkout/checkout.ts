'use server'

import { post } from '@/utils/fetch'

export default async function checkout(productId: number) {
  return post('checkout/session', { productId })
}
