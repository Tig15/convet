import {query} from './_generated/server'

export const get = query({
    args: {},
    handler: async (ctx, args) => {
        return await ctx.db.query('groups').collect()
    },
})