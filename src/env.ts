import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string().url('mongodb+srv://admin:123doafacil@cluster0.3mj5p.mongodb.net'),
  PORT: z.coerce.number().optional().default(8000),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
});

export type Env = z.infer<typeof envSchema>;
