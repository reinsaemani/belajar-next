import * as z from 'zod';

const EnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_ENABLE_API_MOCKING: z
    .string()
    .refine((s) => s === 'true' || s === 'false')
    .transform((s) => s === 'true')
    .optional(),
  NEXT_PUBLIC_URL: z.string().url().optional().default('http://localhost:3000'),
  NEXT_PUBLIC_MOCK_API_PORT: z.string().optional().default('8080'),
});

const envVars = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_ENABLE_API_MOCKING: process.env.NEXT_PUBLIC_ENABLE_API_MOCKING,
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  NEXT_PUBLIC_MOCK_API_PORT: process.env.NEXT_PUBLIC_MOCK_API_PORT,
};

const parsedEnv = EnvSchema.parse(envVars);

export const env = {
  API_URL: parsedEnv.NEXT_PUBLIC_API_URL,
  ENABLE_API_MOCKING: parsedEnv.NEXT_PUBLIC_ENABLE_API_MOCKING,
  APP_URL: parsedEnv.NEXT_PUBLIC_URL,
  APP_MOCK_API_PORT: parsedEnv.NEXT_PUBLIC_MOCK_API_PORT,
};
