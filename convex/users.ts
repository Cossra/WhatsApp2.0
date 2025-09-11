import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

//Get user by Clerk User ID
export const getUserByClerkUserId = query({
    args: { UserId: v.string() },
    handler: async (ctx, { UserId }) => {
        if(!UserId) {
            return null;
        }

        return await ctx.db
        .query("users")
        .withIndex("byUserId", (q) => q.eq("UserId", UserId))
        .first();
    },
});

//Create or update new user
export const upsertUser = mutation({
    args: { UserId: v.string(), name: v.string(), email: v.string(), imageUrl: v.string(), profileImageUrl: v.string() },
    handler: async (ctx, { UserId, name, email, imageUrl, profileImageUrl }) => {
        if(!UserId) {
            throw new Error("UserId is required");
        }

        const user = await ctx.db
        .query("users")
        .withIndex("byUserId", (q) => q.eq("UserId", UserId))
        .first();

        if(user) {
            return await ctx.db
            .patch(user._id, { name, email, imageUrl, profileImageUrl });
        }

        return await ctx.db
        .insert("users", { UserId, name, email, imageUrl, profileImageUrl });
    }
});

//Search users by name or email
export const searchUsers = query({
    args: { searchTerm: v.string() },
    handler: async (ctx, { searchTerm }) => {
        if(!searchTerm) {
            return [];
        }

        const normalizedSearch = searchTerm.toLowerCase();

        const allUsers = await ctx.db.query("users").collect();

        return allUsers
        .filter(user => 
            user.name.toLowerCase().includes(normalizedSearch) || 
            user.email.toLowerCase().includes(normalizedSearch)
        ).slice(0, 10); // Limit to 10 results
    }
});