'use server'

import { revalidateTag } from 'next/cache'

import { env } from '@/constants/env'
import { getHeaders, post } from '@/utils/fetch'

export default async function createProduct(formData: FormData) {
  const response = await post('products', formData)

  const productImage = formData.get('image') as File

  if (productImage instanceof File && !response.error) {
    const productId = response.data.id
    await upload(productId, productImage)
  }

  revalidateTag('products')
  return response
}

async function upload(productId: number, file: File) {
  const formData = new FormData()
  formData.append('image', file)

  await fetch(`${env.API_URL}/products/${productId}/image`, {
    method: 'POST',
    body: formData,
    headers: getHeaders()
  })
}
