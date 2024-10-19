import { z } from 'zod';
export declare const envSchema: z.ZodObject<{
    DATABASE_URL: z.ZodString;
    PORT: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    JWT_PRIVATE_KEY: z.ZodString;
    JWT_PUBLIC_KEY: z.ZodString;
}, "strip", z.ZodTypeAny, {
    DATABASE_URL?: string;
    PORT?: number;
    JWT_PRIVATE_KEY?: string;
    JWT_PUBLIC_KEY?: string;
}, {
    DATABASE_URL?: string;
    PORT?: number;
    JWT_PRIVATE_KEY?: string;
    JWT_PUBLIC_KEY?: string;
}>;
export type Env = z.infer<typeof envSchema>;
