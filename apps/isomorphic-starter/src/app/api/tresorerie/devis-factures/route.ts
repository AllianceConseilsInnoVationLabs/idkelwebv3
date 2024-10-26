"use server";

import { Client } from "@/lib/definitions";
import { retrieveStored } from "@/lib/session";
const apibase = process.env.API_BASE_URL;

export async function GET() {
    const client: Client = await retrieveStored('client') as Client;
    
    const DevisFactures = await fetch(`${apibase}/client/factures/${client.id}`)
        .then((res) => res.json());
    
    const datas = { 
        items: DevisFactures
    };

    return Response.json(datas);
}