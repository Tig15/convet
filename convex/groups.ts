import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx, args) => {
    return await ctx.db.query("groups").collect();
  },
});

export const getGroups = query({
  args: { id: v.id("groups") },
  handler: async (ctx, { id }) => {
    return await ctx.db
      .query("groups")
      .filter((q) => q.eq(q.field("_id"), id))
      .unique();
  },
});

export const create = mutation({
  args: { description: v.string(), name: v.string(), icon_url: v.string() },
  handler: async ({ db }, args) => {
    await db.insert("groups", args);
  },
});
