"use server";

import { Client } from "@/lib/definitions";
import { retrieveStored } from "@/lib/session";
const apibase = process.env.API_BASE_URL;

export async function GET() {
    const today = new Date();
    const month = today.getMonth() + 1;
    
    const client: any = await retrieveStored('client');
    const tva = await fetch(`${apibase}/client/get/tva/${month}/${client.id}`)
        .then((res) => res.json());
        
    const soldeIdkel = await fetch(`${apibase}/portefeuille/solde-entreprise/${client.id}`)
        .then((res) => res.json());
        
    const soldesComptes = await fetch(`${apibase}/client/compte/somme/${client.id}`)
        .then((res) => res.json());

    const soldes = { 
        idkel: parseInt(soldeIdkel.compte.solde), 
        caisse: soldesComptes.caisse, 
        banque: soldesComptes.banque 
    };
    const datas = { tva, soldes };

    return Response.json(datas);
}