import { z } from 'zod'

export const $SignInSchema = z.object({ email: z.string().email(), password: z.string() })

export const $SignUpSchema = z.object({ name: z.string().min(1), email: z.string().email(), password: z.string() })
