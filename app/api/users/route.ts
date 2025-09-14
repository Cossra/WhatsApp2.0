declare global {
  // eslint-disable-next-line no-var
  var __userUpsertRateLimit: Record<string, { count: number; start: number }> | undefined;
}
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // Fetch users from Convex
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "https://blessed-squirrel-286.convex.cloud";
  const convex = new ConvexHttpClient(convexUrl);
  const users = await convex.query(api.users.searchUsers, { searchTerm: "" });
  const streamUsers = users.map((user: any) => ({
    id: user.UserId,
    name: user.name,
    image: user.imageUrl,
    email: user.email,
  }));
  return Response.json(streamUsers);
}

import { NextResponse } from "next/server";
import { StreamChat } from "stream-chat";

export async function POST(request: NextRequest) {
  // Simple in-memory rate limiting (per IP, resets on server restart)
  const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
  const RATE_LIMIT_MAX = 10; // max 10 requests per window
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  if (!globalThis.__userUpsertRateLimit) {
    globalThis.__userUpsertRateLimit = {};
  }
  const now = Date.now();
  const rateData = globalThis.__userUpsertRateLimit[ip] || { count: 0, start: now };
  if (now - rateData.start > RATE_LIMIT_WINDOW) {
    rateData.count = 0;
    rateData.start = now;
  }
  rateData.count++;
  globalThis.__userUpsertRateLimit[ip] = rateData;
  if (rateData.count > RATE_LIMIT_MAX) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  // Upsert users in Stream Chat using server API key
  const body = await request.json();
  const users = body.users;
  if (!Array.isArray(users)) {
    return NextResponse.json({ error: "Missing users array" }, { status: 400 });
  }

  const streamApiKey = process.env.STREAM_API_KEY;
  const streamApiSecret = process.env.STREAM_API_SECRET_KEY;
  if (!streamApiKey || !streamApiSecret) {
    return NextResponse.json({ error: "Missing Stream API credentials" }, { status: 500 });
  }

  const serverClient = StreamChat.getInstance(streamApiKey, streamApiSecret);
  try {
    await serverClient.upsertUsers(users);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Stream upsert error" }, { status: 500 });
  }
}