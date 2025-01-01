import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    AUTH_SECRET: process.env.NODE_ENV === 'production' ? z.string() : z.string().optional(),
    WORDPRESS_DOMAIN: z.string().min(1),
    WORDPRESS_APP_USERNAME: z.string().min(1),
    WORDPRESS_APP_PASSWORD: z.string().min(1),
  },

  client: {},

  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    WORDPRESS_DOMAIN: process.env.WORDPRESS_DOMAIN,
    WORDPRESS_APP_USERNAME: process.env.WORDPRESS_APP_USERNAME,
    WORDPRESS_APP_PASSWORD: process.env.WORDPRESS_APP_PASSWORD,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
})
