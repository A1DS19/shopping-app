'use server'

import { post } from '@/utils/fetch'

export default async function createProduct(formData: FormData) {
  return post('products', formData)
}
