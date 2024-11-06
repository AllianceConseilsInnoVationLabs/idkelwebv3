import { z } from 'zod';

// Form zod validation schema
export const newOperationWithAccountSchema = z.object({
  intitule: z.string({
    required_error: "L'intitulé est requis",
  }).min(1, { message: "L'intitulé est requis" }),
  montant: z.number({
    required_error: "Le montant est requis",
    invalid_type_error: "Le montant doit être un chiffre",
  }).gte(0, { message: "Le montant doit être un chiffre positif" }),
  checkdate: z.string({
    required_error: "La date de reglement est requise",
    invalid_type_error: "Veuillez saisir une date de reglement valide!",
  }).datetime({ message: "Veuillez saisir une date de reglement valide" }),
  facturedate: z.string({
    required_error: "La date de facturation est requise",
    invalid_type_error: "Veuillez saisir une date de facturation valide!",
  }).datetime({ message: "Veuillez saisir une date de facturation valide" }),
  customer: z.number({
    required_error: "Veuillez choisir un client!",
  }),
  compte: z.number({
    required_error: "Veuillez choisir un compte sur lequel encaisser!",
    invalid_type_error: "Veuillez choisir un compte sur lequel encaisser!",
  }).min(1, { message: "Veuillez choisir un compte sur lequel encaisser!" })
});

// Generate form types from zod validation schema
export type NewOperationWithAccountSchema = z.infer<typeof newOperationWithAccountSchema>;

export const newOperationWithoutAccountSchema = z.object({
  intitule: z.string({
    required_error: "L'intitulé est requis",
  }).min(1, { message: "L'intitulé est requis" }),
  montant: z.number({
    required_error: "Le montant est requis",
    invalid_type_error: "Le montant doit être un chiffre",
  }).gte(0, { message: "Le montant doit être un chiffre positif" }),
  checkdate: z.string({
    required_error: "La date de reglement est requise",
    invalid_type_error: "Veuillez saisir une date de reglement valide!",
  }).datetime({ message: "Veuillez saisir une date de reglement valide" }),
  facturedate: z.string({
    required_error: "La date de facturation est requise",
    invalid_type_error: "Veuillez saisir une date de facturation valide!",
  }).datetime({ message: "Veuillez saisir une date de facturation valide" }),
  customer: z.number({
    required_error: "Veuillez choisir un client!",
  })
});

// Generate form types from zod validation schema
export type NewOperationWithoutAccountSchema = z.infer<typeof newOperationWithoutAccountSchema>;