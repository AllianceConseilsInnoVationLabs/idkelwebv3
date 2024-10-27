"use server";

import { Client } from "@/lib/definitions";
import { retrieveStored } from "@/lib/session";
const apibase = process.env.API_BASE_URL;

export async function GET() {
    const client: Client = await retrieveStored('client') as Client;
    
    const DevisFactures = await fetch(`${apibase}/client/factures/${client.id}`)
        .then((res) => res.json());

    const SubAccounts = await fetch(`${apibase}/client/listeComptes/${client.id}`)
        .then((res) => res.json());

    console.log(SubAccounts);
    
    const datas = { 
        items: DevisFactures,
        subaccounts: SubAccounts
    };

    return Response.json(datas);
}