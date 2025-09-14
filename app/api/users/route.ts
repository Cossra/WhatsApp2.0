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