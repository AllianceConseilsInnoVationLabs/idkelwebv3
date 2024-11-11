"use server";

import { retrieveStored } from "@/lib/session";
import { encWASchema, encWOASchema, decWASchema, decWOASchema } from '@/validators/idkel/operation.schema';
import { CreateEncaissementForm, CreateSubOperationForm } from '@/lib/form-definitions';
import { format } from 'date-fns';

const apibase = process.env.API_BASE_URL;

export async function createOperation(params: any[], state: CreateEncaissementForm, formData: FormData) {
    const [operation, customer, checkDate, factureDate, sellmode, tva, type, service, magasin, stock, charge, fournisseur] = params;
    
    let validatedFields: any = {};
    let validatorWithAccount = operation === 'encaissement' ? encWASchema : decWASchema;
    let validatorWithoutAccount = operation === 'encaissement' ? encWOASchema : decWOASchema;

    if(sellmode !== 'credit'){
        validatedFields = validatorWithAccount?.safeParse(operation === 'encaissement' ? {
            intitule: formData.get('intitule') as string,
            montant: parseInt(formData.get('montant') as string),
            facturedate: checkDate && checkDate.toISOString(),
            checkdate: factureDate && factureDate.toISOString(),
            customer: customer,
            compte: formData.get('compte') ? parseInt(formData.get('compte') as string) : null,
        } : {
            intitule: formData.get('intitule') as string,
            montant: parseInt(formData.get('montant') as string),
            facturedate: factureDate && factureDate.toISOString(),
            checkdate: checkDate && checkDate.toISOString(),
            charge: charge.id,
            fournisseur: fournisseur.id,
            compte: formData.get('compte') ? parseInt(formData.get('compte') as string) : null,
        });
    }else{
        validatedFields = validatorWithoutAccount?.safeParse(operation === 'encaissement' ? {
            intitule: formData.get('intitule') as string,
            montant: parseInt(formData.get('montant') as string),
            facturedate: factureDate && factureDate.toISOString(),
            checkdate: checkDate && checkDate.toISOString(),
            customer: customer,
        } : {
            intitule: formData.get('intitule') as string,
            montant: parseInt(formData.get('montant') as string),
            facturedate: factureDate && factureDate.toISOString(),
            checkdate: checkDate && checkDate.toISOString(),
            charge: charge.id,
            fournisseur: fournisseur.id,
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
                    partial: ['Le montant d\'acompte est sup"rieur au montant de la facture']
                },
            }
        }
    }

    const client: any = await retrieveStored('client');
    let datas = {};
    let routeapi = '';

    if(operation === 'encaissement'){
        routeapi = 'client/add-encaissement';

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
    }else if(operation === 'decaissement'){
        routeapi = 'client/add-decaissement';

        datas = {
            intitule: validatedFields.data.intitule,
            montant: validatedFields.data.montant,
            partial_amount: sellmode === 'acompte' ? partial : sellmode === 'total' ? validatedFields.data.montant : 0,
            tva,
            date_facturation: format(validatedFields.data.facturedate, "yyyy-MM-dd"),
            date_reglement: format(validatedFields.data.checkdate, "yyyy-MM-dd"),
            type_mouvement: 'decaissement',
            compte_tresorerie_id: validatedFields.data.compte,
            client_id: client.id,
            status: sellmode === 'acompte' ? "En cours" : sellmode === 'total' ? "Payé" : "En attente",
            taux_paiement: '',
            type_produit: "charge",
            fournisseur_id: fournisseur.id,
            charge_id: charge.id,
        }
    }

    const response = await fetch(`${apibase}/${routeapi}`, {
        method: 'POST',
        body: JSON.stringify(datas),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();
    console.log(data);
    return data;
}

export async function deleteOperation(id: number) {
    const response = await fetch(`${apibase}/client/DeleteMouvement/${id}`);
    const data = await response.json();

    return data;
}

export async function getOperationHistory(id: number) {
    const response = await fetch(`${apibase}/client/liste-paiement-partiel/${id}`, {
        method: 'POST',
    });

    const data = await response.json();
    return data;
}

export async function createSubOperation(params: any[], state: CreateSubOperationForm, formData: FormData) {
    console.log(params);
}