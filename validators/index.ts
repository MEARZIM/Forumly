import { z } from 'zod'

export const SubforumValidatorSchema = z.object({
    name: z.string().min(2,{
        message: "Community name must be at least 2 characters."
    }).max(18, {
         message: "Community name must be up to 18 characters."
    }),
});
export type CreateSubForumPayload = z.infer<typeof SubforumValidatorSchema>