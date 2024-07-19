'use server'

import { get } from '@/utils/fetch'

import { IProduct } from './types/product.type'

export default async function getProduct(productId: number) {
  return get<IProduct>(`products/${productId}`)
}
