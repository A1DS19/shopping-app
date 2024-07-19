import Grid from '@mui/material/Unstable_Grid2/Grid2'

import getProducts from '@/actions/products/get-products'

import { Product } from './product'

export async function Products() {
  const products = await getProducts()

  return (
    <Grid
      container
      spacing={3}
      sx={{
        height: '85vh',
        overflowY: 'scroll',
        scrollbarColor: '#ccc transparent',
        scrollbarWidth: 'thin'
      }}
    >
      {products.map((product) => (
        <Grid key={product.id} sm={6} lg={4} xs={12}>
          <Product product={product} />
        </Grid>
      ))}
    </Grid>
  )
}
