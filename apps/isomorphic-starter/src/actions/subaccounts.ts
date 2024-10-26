"use server";

import { newSubAccountSchema, provisionSubAccountSchema } from '@/validators/idkel/subaccount.schema';
import { NewSubAccountForm, ProvisionSubAccountForm } from '@/lib/form-definitions';
import { retrieveStored } from "@/lib/session";

const apibase = process.env.API_BASE_URL;

export async function newSubAccount(state: NewSubAccountForm, formData: FormData) {
    let validatedFields: any = {};
    
    if(formData.get('compte_type') === 'Banque') {
        validatedFields = newSubAccountSchema.safeParse({
            libelle: formData.get('libelle'),
            solde: parseInt(formData.get('solde') as string || '0'),
            compte_type: formData.get('compte_type') as string,
            code: formData.get('code') as string,
        });
    }else{
        validatedFields = newSubAccountSchema.safeParse({
            libelle: formData.get('libelle'),
            solde: parseInt(formData.get('solde') as string || '0'),
            compte_type: formData.get('compte_type') as string,
        });
    }
    
    console.log(formData.get('libelle'));
    console.log(validatedFields?.error?.flatten().fieldErrors);

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const client: any = await retrieveStored('client');

    const fData = new FormData();
    fData.set('nom_compte', validatedFields.data.libelle as string);
    fData.set('solde', validatedFields.data.solde.toString());
    fData.set('compte_type', validatedFields.data.compte_type as string);
    fData.set('client_id', client.id);

    const response = await fetch(
        `${apibase}/client/addCompte`, 
        {
            method: 'POST',
            body: fData
        }
    );

    const data = await response.json();

    if(!data.success) {
        return data;
    }

    const allcomptes = await fetch(`${apibase}/client/listeComptes/${client.id}`)
        .then((res) => res.json());

    const caisses = allcomptes.filter((a: any) => a.compte_type === 'Caisse');
    const banques = allcomptes.filter((a: any) => a.compte_type === 'Banque');

    return { 
        success: true, 
        comptes : { caisses, banques } 
    };
}

export async function provisionSubAccount(state: ProvisionSubAccountForm, formData: FormData) {
    console.log(formData.get('compte'), ' vers ', formData.get('receiver'));

    const validatedFields = provisionSubAccountSchema.safeParse({
        montant: parseInt(formData.get('montant') as string),
        compte: parseInt(formData.get('compte') as string),
        receiver: parseInt(formData.get('receiver') as string),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const client: any = await retrieveStored('client');

    const fData = new FormData();
    fData.set('montant', validatedFields.data.montant.toString());
    fData.set('destinateur', validatedFields.data.compte.toString());
    fData.set('destinataire', validatedFields.data.receiver.toString());
    fData.set('client_id', client.id);

    const response = await fetch(
        `${apibase}/client/compte/add-fond`, 
        {
            method: 'POST',
            body: fData
        }
    );

    const data = await response.json();
    console.log(data);

    if(!data.success) {
        return data;
    }

    const allcomptes = await fetch(`${apibase}/client/listeComptes/${client.id}`)
        .then((res) => res.json());

    const caisses = allcomptes.filter((a: any) => a.compte_type === 'Caisse');
    const banques = allcomptes.filter((a: any) => a.compte_type === 'Banque');

    return { 
        success: true, 
        comptes : { caisses, banques } 
    };
}