"use server";

import { Client } from "@/lib/definitions";
import { retrieveStored } from "@/lib/session";
const apibase = process.env.API_BASE_URL;

export async function GET() {
    const client: Client = await retrieveStored('client') as Client;
    
    const soldeIdkel = await fetch(`${apibase}/portefeuille/solde-entreprise/${client.id}`)
        .then((res) => res.json());
        
    const soldesComptes = await fetch(`${apibase}/client/compte/somme/${client.id}`)
        .then((res) => res.json());

    const allcomptes = await fetch(`${apibase}/client/listeComptes/${client.id}`)
        .then((res) => res.json());

    const transactions = await fetch(`${apibase}/portefeuille/transactions-entreprise/${client.id}`)
        .then((res) => res.json());

    const caisses = allcomptes.filter((a: any) => a.compte_type === 'Caisse');
    const banques = allcomptes.filter((a: any) => a.compte_type === 'Banque');

    const soldes = { 
        idkel: parseInt(soldeIdkel.compte.solde), 
        caisse: soldesComptes.caisse, 
        banque: soldesComptes.banque
    };
    
    const datas = { 
        soldes, 
        comptes: {
            caisses,
            banques
        },
        transactions
    };

    return Response.json(datas);
}