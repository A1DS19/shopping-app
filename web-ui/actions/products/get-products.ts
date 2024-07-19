'use server'

import { get } from '@/utils/fetch'

import { IProduct } from './types/product.type'

export default async function getProducts() {
  return get<IProduct[]>('products', ['products'])
}
