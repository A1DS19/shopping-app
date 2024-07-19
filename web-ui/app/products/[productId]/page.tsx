import { Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import Image from 'next/image'

import getProduct from '@/actions/products/get-product'
import { Checkout } from '@/components/checkout'
import { env } from '@/constants/env'

interface IProductProps {
  params: {
    productId: string
  }
}

export default async function Product({ params: { productId } }: IProductProps) {
  const product = await getProduct(Number(productId))

  return (
    <Grid container marginBottom={'2rem'} rowGap={3}>
      {product.imageExists && (
        <Grid md={6} xs={12}>
          <Image
            src={`${env.API_URL}/images/products/${product.id}.jpg`}
            alt={product.name}
            width={0}
            height={0}
            sizes='100vw'
            className='w-auto md:w-3/4 h-auto'
          />
        </Grid>
      )}

      <Grid md={6} xs={12}>
        <Stack gap={3}>
          <Typography variant='h2'>{product.name}</Typography>
          <Typography>{product.description}</Typography>
          <Typography variant='h4'>${product.price}</Typography>
          <Checkout productId={product.id} />
        </Stack>
      </Grid>
    </Grid>
  )
}
