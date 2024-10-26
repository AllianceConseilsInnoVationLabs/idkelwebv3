"use server";

import { Client } from "@/lib/definitions";
import { retrieveStored } from "@/lib/session";
const apibase = process.env.API_BASE_URL;

export async function GET() {
    const client: Client = await retrieveStored('client') as Client;
    const fetched = await fetch(`${apibase}/client/tresorerie/deviscreatedatas/${client.id}`)
        .then((res) => res.json());
    
    const datas = { 
        ...fetched,
        client: {
            regime: client.regime_imposition
        }
    };

    return Response.json(datas);
}