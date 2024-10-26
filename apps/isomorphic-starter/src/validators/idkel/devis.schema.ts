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