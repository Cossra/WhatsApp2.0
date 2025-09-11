'use server'

import { streamServerClient } from "@/lib/streamServer";

export async function createToken(userId: string) {
    const token = streamServerClient.createToken(userId);
    console.log("Generated token for user:", userId,);
    return token;
}
