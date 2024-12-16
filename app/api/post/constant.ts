import * as z from "zod";

export const UrlValidator = z.object({
    limit: z.string(),
    page: z.string(),
    subforumName: z.string().nullish().optional(),
})


export const UrlValidatorForUserProfile = z.object({
    username: z.string().nullish().optional(),
    limit: z.string(),
    page: z.string(),
    tabName: z.string()
})