import { Card, CardActionArea, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

import { IProduct } from '@/actions/products/types/product.type'
import { env } from '@/constants/env'

interface IProductProps {
  product: IProduct
}

export function Product({ product }: IProductProps) {
  return (
    <CardActionArea component={Link} href={`/products/${product.id}`}>
      <Card className='p-4'>
        <Stack spacing={2}>
          <Typography variant='h4'>{product.name}</Typography>
          {product.imageExists && (
            <Image
              src={`${env.API_URL}/images/products/${product.id}.jpg`}
              alt={product.name}
              width={0}
              height={0}
              sizes='100vw'
              className='w-full h-auto'
            />
          )}
          <Typography>{product.description}</Typography>
          <Typography>${product.price}</Typography>
        </Stack>
      </Card>
    </CardActionArea>
  )
}
