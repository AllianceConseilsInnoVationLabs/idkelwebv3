"use server";

import { Client } from "@/lib/definitions";
import { retrieveStored } from "@/lib/session";
const apibase = process.env.API_BASE_URL;

export async function GET() {
    const client: Client = await retrieveStored('client') as Client;
    
    const encaissements = await fetch(`${apibase}/client/listeMouvementByClient/encaissement/${client.id}`)
        .then((res) => res.json());
    
    const datas = { 
        items: encaissements
    };

    return Response.json(datas);
}