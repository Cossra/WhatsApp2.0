import { NextRequest } from "next/server";
import { streamServerClient } from "@/lib/streamServer";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return new Response(JSON.stringify({ error: "Missing userId" }), { status: 400 });
  }
  try {
    const token = streamServerClient.createToken(userId);
    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
