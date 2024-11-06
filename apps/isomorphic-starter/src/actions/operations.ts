"use server";

import { retrieveStored } from "@/lib/session";
import { newOperationWithAccountSchema, newOperationWithoutAccountSchema } from '@/validators/idkel/operation.schema';
import { CreateEncaissementForm } from '@/lib/form-definitions';
import { format } from 'date-fns';

const apibase = process.env.API_BASE_URL;

export async function createOperation(params: any[], state: CreateEncaissementForm, formData: FormData) {
    const [operation, customer, checkDate, factureDate, sellmode, tva, type, service, magasin, stock] = params;
    let validatedFields: any = {};
    
    if(sellmode !== 'credit'){
        validatedFields = newOperationWithAccountSchema.safeParse({
            intitule: formData.get('intitule') as string,
            montant: parseInt(formData.get('montant') as string),
            facturedate: checkDate && checkDate.toISOString(),
            checkdate: factureDate && factureDate.toISOString(),
            customer: customer,
            compte: formData.get('compte') ? parseInt(formData.get('compte') as string) : null,
        });
    }else{
        validatedFields = newOperationWithoutAccountSchema.safeParse({
            intitule: formData.get('intitule') as string,
            montant: parseInt(formData.get('montant') as string),
            facturedate: checkDate && checkDate.toISOString(),
            checkdate: factureDate && factureDate.toISOString(),
            customer: customer,
        });
    }    

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const partial = parseInt(formData.get('partial') as string);
    if(sellmode === 'acompte'){
        if( isNaN(partial) || partial <= 0 ){
            return {
                errors: {
                    partial: ['Veuillez saisir un montant d\'acompte valide']
                },
            }
        }

        if(partial > validatedFields.data.montant){
            return {
                errors: {
                    partial: ['Le montant d\'acompte est superieur au montant de la facture']
                },
            }
        }
    }

    const client: any = await retrieveStored('client');
    let datas = {};

    if(type === "service"){
        datas = {
            intitule: validatedFields.data.intitule,
            montant: validatedFields.data.montant,
            partial_amount: sellmode === 'acompte' ? partial : sellmode === 'total' ? validatedFields.data.montant : 0,
            tva,
            date_facturation: format(validatedFields.data.facturedate, "yyyy-MM-dd"),
            date_reglement: format(validatedFields.data.checkdate, "yyyy-MM-dd"),
            type_mouvement: 'encaissement',
            compte_tresorerie_id: validatedFields.data.compte,
            client_id: client.id,
            status: sellmode === 'acompte' ? "En cours" : sellmode === 'total' ? "Payé" : "En attente",
            taux_paiement: '',
            service_id: service,
            customer_id: validatedFields.data.customer,
            type_produit: "service",
        }
    }else if(type === "stock"){
        const qte = parseInt(formData.get('qte') as string);
        console.log('Quantite', qte);

        if( isNaN(qte) || partial <= 0 ){
            return {
                errors: {
                    qte: ["Veuillez saisir une quantité valide"]
                },
            }
        }

        if(qte > stock.quantite){
            return {
                errors: {
                    qte: [`La quantité est supérieure au stock disponible (${stock.quantite})`]
                },
            }
        }

        datas = {
            intitule: validatedFields.data.intitule,
            montant: validatedFields.data.montant,
            partial_amount: sellmode === 'acompte' ? partial : sellmode === 'total' ? validatedFields.data.montant : 0,
            tva,
            date_facturation: format(validatedFields.data.facturedate, "yyyy-MM-dd"),
            date_reglement: format(validatedFields.data.checkdate, "yyyy-MM-dd"),
            type_mouvement: 'encaissement',
            compte_tresorerie_id: validatedFields.data.compte,
            client_id: client.id,
            status: sellmode === 'acompte' ? "En cours" : sellmode === 'total' ? "Payé" : "En attente",
            taux_paiement: '',
            service_id: null,
            customer_id: validatedFields.data.customer,
            type_produit: type,
            magasin_id: magasin.id,
            stock_id: stock.id,
            quantite: qte,
        }
    }

    const response = await fetch(`${apibase}/client/add-encaissement`, {
        method: 'POST',
        body: JSON.stringify(datas),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();
    return data;
}

export async function deleteOperation(id: number) {
    const response = await fetch(`${apibase}/client/DeleteMouvement/${id}`);
    const data = await response.json();

    console.log(data);
    return data;
}