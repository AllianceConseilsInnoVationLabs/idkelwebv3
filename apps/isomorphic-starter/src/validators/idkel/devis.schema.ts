import { z } from 'zod';

// Form zod validation schema
export const createDevisSchema = z.object({
  numero: z.string({
    required_error: "Le numero de facture est requis",
  }).min(1, { message: "Le numero de facture est requis." }),
  payment_method: z.string({
    required_error: "Le moyen de paiement est requis",
  }),
  emission: z.string({
    required_error: "La date d'émission est requise",
  }).datetime({ message: "La date d'émission est requise." }),
  echeance: z.string({
    required_error: "La date d'échéance est requise",
  }).datetime({ message: "La date d'échéance est requise." }),
  customer: z.number({
    required_error: "Veuillez choisir un client!",
  }),
});

export const withdrawDevisSchema = z.object({
  devis_id: z.number({
    required_error: "Veuillez choisir un devis!",
  }).min(1, { message: "Veuillez choisir un devis!" }),
  montant: z.number({
    required_error: "Le montant est requis",
    invalid_type_error: "Le montant doit être un chiffre",
  }).gte(0, { message: "Le montant doit être un chiffre positif" }),
  compte: z.number({
    required_error: "Veuillez choisir un compte sur lequel encaisser!",
    invalid_type_error: "Veuillez choisir un compte sur lequel encaisser!",
  }).min(1, { message: "Veuillez choisir un compte sur lequel encaisser!" }),
  checkdate: z.string({
    required_error: "La date de reglement est requise",
    invalid_type_error: "Veuillez saisir une date de reglement valide!",
  }).datetime({ message: "Veuillez saisir une date de reglement valide" }),
});