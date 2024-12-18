"use server";

import { Client } from "@/lib/definitions";
import { retrieveStored } from "@/lib/session";
const apibase = process.env.API_BASE_URL;

export async function GET() {
    const client: Client = await retrieveStored('client') as Client;
    
    const encaissements = await fetch(`${apibase}/client/operations/${client.id}/encaissement`)
        .then((res) => res.json());

    const subaccounts = await fetch(`${apibase}/client/listeComptes/${client.id}`)
        .then((res) => res.json());
        
    const tvas = await fetch(`${apibase}/client/ListesTvas/${client.id}`)
        .then((res) => res.json());
        
    const { operations, services, produits, magasins, customers } = encaissements;
    
    const datas = { 
        items: operations,
        services,
        produits,
        magasins,
        customers,
        subaccounts,
        tvas,
        regime: client.regime_imposition,
    };

    return Response.json(datas);
}