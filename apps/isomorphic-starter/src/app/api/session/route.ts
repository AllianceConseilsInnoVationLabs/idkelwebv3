
"use server";

import { getSession } from "@/lib/session";

export async function POST(request: Request) {
    const session = await getSession();
    return Response.json(session);
}