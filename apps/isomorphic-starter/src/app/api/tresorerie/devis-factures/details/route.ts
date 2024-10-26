"use server";

import { type NextRequest } from 'next/server';
import { Client } from "@/lib/definitions";
import { retrieveStored } from "@/lib/session";
const apibase = process.env.API_BASE_URL;
 
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id');
    
    console.log(id);
    const datas = await fetch(`${apibase}/client/devis/${id}`)
            .then((res) => res.json());
    
    return Response.json({ ...datas });
}