
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    // Clerk user ID
    UserId: v.string(),
    // User's display name
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    // User's profile image URL
    profileImageUrl: v.optional(v.string()),
    // Timestamp of when the user was created
  })
    .index("byUserId", ["UserId"])
    .index("byEmail", ["email"]),
});