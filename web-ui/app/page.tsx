import { CreateProductFab } from '@/components/products/create/create-product-fab'
import { Products } from '@/components/products/products'

export default async function Home() {
  return (
    <>
      <Products />
      <CreateProductFab />
    </>
  )
}
