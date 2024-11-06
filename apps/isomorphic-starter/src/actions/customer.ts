"use server";

import { retrieveStored } from "@/lib/session";
import { createCustomerSchema } from '@/validators/idkel/customer.schema';
import { CreateCustomerForm } from '@/lib/form-definitions';

const apibase = process.env.API_BASE_URL;

export async function createCustomer(state: CreateCustomerForm, formData: FormData) {
    let validatedFields: any = {};

    validatedFields = createCustomerSchema.safeParse({
        nom: formData.get('nom'),
        prenom: formData.get('prenom'),
        email: formData.get('email'),
        telephone: formData.get('telephone'),
        adresse: formData.get('adresse'),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const client: any = await retrieveStored('client');

    const fData = new FormData();
    fData.set('nom_client', validatedFields.data.nom as string);
    fData.set('prenom_client', formData.get('prenoms') as string);
    fData.set('tel_client', validatedFields.data.telephone as string);
    fData.set('email_client', validatedFields.data.email as string);
    fData.set('adresse_client', formData.get('adresse') as string);
    fData.set('client_id', client.id);

    const response = await fetch(
        `${apibase}/stocks/savecustomer`, 
        {
            method: 'POST',
            body: fData
        }
    );

    const data = await response.json();

    if(!data.success) {
        return data;
    }

    return { 
        success: true, 
        customer : data.customer 
    };
}