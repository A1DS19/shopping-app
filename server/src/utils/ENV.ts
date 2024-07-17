import { z } from 'zod';

const envSchema = z.object({
  PORT: z.preprocess((val) => Number(val), z.number().default(3000)),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN_HOURS: z.string().default('10h'),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error('Invalid environment variables:', result.error.format());
  throw new Error('Invalid environment variables');
}

export const ENV = result.data;
