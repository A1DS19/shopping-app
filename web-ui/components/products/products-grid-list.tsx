'use client'

import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { useEffect } from 'react'
import io, { Socket } from 'socket.io-client'

import getAuthentication from '@/actions/auth/get-authentication'
import revalidateGetProducts from '@/actions/products/revalidate-get-products'
import { IProduct } from '@/actions/products/types/product.type'

import { Product } from './product'

interface IProductsGridListProps {
  products: IProduct[]
}

export function ProductsGridList({ products }: IProductsGridListProps) {
  useEffect(() => {
    let socket: Socket
    const createSocket = async () => {
      socket = io('http://server:3001', {
        auth: {
          Authentication: await getAuthentication()
        }
      })
      socket.on('productUpdated', () => {
        revalidateGetProducts()
      })
    }

    createSocket()
    return () => {
      socket?.disconnect()
    }
  }, [])

  return (
    <>
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
    </>
  )
}
