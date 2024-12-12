import * as z from "zod";

export const UrlValidator = z.object({
    limit: z.string(),
    page: z.string(),
    subforumName: z.string().nullish().optional(),
})