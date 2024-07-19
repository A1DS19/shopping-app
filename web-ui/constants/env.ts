import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.string(),
  API_URL: z.string(),
  NEXT_PUBLIC_STRIPE_PUBLIC_KEY: z.string()
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.log('Invalid environment variables:', parsedEnv.error.format())
  throw new Error('Invalid environment variables')
}

export const env = parsedEnv.data
