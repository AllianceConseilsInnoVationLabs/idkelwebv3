import { z } from 'zod';

// Form zod validation schema
export const createCustomerSchema = z.object({
  nom: z.string({
    required_error: "Le nom est requis",
  }).min(1, { message: "Le nom est requis" }),
  email: z.string({
    required_error: "L'email est requis",
  }).email({ message: 'Veuillez saisir un email valide' }),
  telephone: z.string({
    required_error: "Le téléphone est requis",
  }).min(10, { message: "Le téléphone doit être au moins de 10 caractères" }),
});