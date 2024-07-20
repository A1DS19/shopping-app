import getProducts from '@/actions/products/get-products'

import { ProductsGridList } from './products-grid-list'

export async function Products() {
  const products = await getProducts()

  return <ProductsGridList products={products} />
}
