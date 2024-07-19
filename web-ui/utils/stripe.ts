'use server'

import { loadStripe, Stripe } from '@stripe/stripe-js'

import { env } from '@/constants/env'

let stripePromise: Stripe | null = null

export const getStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
  }

  return stripePromise
}
