'use client'

import { Button } from '@mui/material'

import checkout from '@/actions/checkout/checkout'
import { getStripe } from '@/utils/stripe'

interface ICheckoutProps {
  productId: number
}

export function Checkout({ productId }: ICheckoutProps) {
  const handleCheckout = async () => {
    const session = await checkout(productId)
    const stripe = await getStripe()
    await stripe?.redirectToCheckout({ sessionId: session.data.id })
  }

  return (
    <Button variant='contained' className='max-w-[25%]' onClick={handleCheckout}>
      Buy Now
    </Button>
  )
}
