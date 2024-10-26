import { z } from 'zod';

// Form zod validation schema
export const loginSchema = z.object({
  email: z.string().email({ message: 'Veuillez saisir un email valide' }),
  password: z.string().min(3, { message: 'Le mot de passe doit contenir au moins 8 caractères' }),
  rememberMe: z.boolean().optional(),
});

// Generate form types from zod validation schema
export type LoginSchema = z.infer<typeof loginSchema>;
