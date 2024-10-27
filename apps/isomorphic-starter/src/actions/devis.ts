"use server";

import { retrieveStored } from "@/lib/session";
import { createDevisSchema } from '@/validators/idkel/devis.schema';
import { CreateDevisForm } from '@/lib/form-definitions';
import { format } from 'date-fns';
import { routes } from "@/config/routes-idkel";
import { redirect } from "next/navigation";

const apibase = process.env.API_BASE_URL;

export async function createDevis(params: any[], state: CreateDevisForm, formData: FormData) {
    const [items, customer, emissionDate, echeanceDate, total] = params;
    const fields = {
        numero: formData.get('num_facture'),
        payment_method: formData.get('payment_method'),
        emission: emissionDate && emissionDate.toISOString(),
        echeance: echeanceDate && echeanceDate.toISOString(),
        customer: customer,
    }

    let validatedFields: any = {};
    validatedFields = createDevisSchema.safeParse(fields);
    console.log(validatedFields?.error?.flatten().fieldErrors);
    
    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    console.log('Items', items);
    console.log('Customer', customer);
    console.log('Date Emission', format(emissionDate, "yyyy-MM-dd"));
    console.log('Date Echeance', format(echeanceDate, "yyyy-MM-dd"));
    console.log('Numéro de facture', formData.get('num_facture'));
    console.log('Moyen de paiement', formData.get('payment_method'));
    console.log('total', total);

    const client: any = await retrieveStored('client');
    const montant = total.ht + total.tva - total.remise;

    const fData = new FormData();
    fData.set('numero_facture', validatedFields.data.numero as string);
    fData.set('date_facture', format(emissionDate, "yyyy-MM-dd") as string);
    fData.set('date_echeance', format(echeanceDate, "yyyy-MM-dd") as string);
    fData.set('customerId', validatedFields.data.customer);
    fData.set('montant', montant as unknown as string);
    fData.set('tva', total.tva as unknown as string);
    fData.set('montantHt', total.ht as unknown as string);
    fData.set('total_remise', total.remise as unknown as string);
    fData.set('modepaiement', formData.get('payment_method') as string);
    fData.set('facturereglee', 1 as unknown as string);
    fData.set('items', JSON.stringify(items) as unknown as string);
    fData.set('client_id', client.id);

    const response = await fetch(
        `${apibase}/client/devis/new`, 
        {
            method: 'POST',
            body: fData
        }
    );

    const data = await response.json();
    // console.log(data);

    return data;
}

export async function deleteDevis(id:number) {
    const response = await fetch(`${apibase}/client/devis/delete/${id}`);
    const data = await response.json();
    // console.log(data);

    if(!data.success) {
        return data;
    }

    redirect(routes.tresorerie.devis.index);
}