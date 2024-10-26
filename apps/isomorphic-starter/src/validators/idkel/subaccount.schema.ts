import { z } from 'zod';

// Form zod validation schema
export const newSubAccountSchema = z.object({
  libelle: z.string({
    required_error: "Le libellé est requis",
    invalid_type_error: "Le libellé doit être composé d'au moins un mot",
  }).min(1, { message: "Le libellé est requis" }),
  solde: z.number({
    required_error: "Le solde est requis",
    invalid_type_error: "Le solde doit être un chiffre",
  }).gte(0, { message: "Le solde doit être un chiffre positif" }),
  compte_type: z.string({
    required_error: "Le type de compte est requis",
  }).min(1, { message: "Le type de compte est requis" }),
  code: z.string({
    required_error: "Le numéro de compte est requis",
  }).min(5, { message: "Le numéro de compte doit avoir 05 caractères minimum" }),
});

// Generate form types from zod validation schema
export type NewSubAccountSchema = z.infer<typeof newSubAccountSchema>;

export const provisionSubAccountSchema = z.object({
  montant: z.number({
    required_error: "Le montant est requis",
    invalid_type_error: "Le montant doit être un chiffre",
  }).gte(100, { message: "Le montant doit être supérieur ou égal à 100 " }),
  compte: z.number({
    required_error: "Le compte à débiter est requis",
  }),
  receiver: z.number({
    required_error: "Le compte à créditer est requis",
  }),
});

// Generate form types from zod validation schema
export type ProvisionSubAccountSchema = z.infer<typeof provisionSubAccountSchema>;
