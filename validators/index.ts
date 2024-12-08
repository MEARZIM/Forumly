import { z } from 'zod'

export const SubforumValidatorSchema = z.object({
    name: z.string().min(2, {
        message: "Community name must be at least 2 characters."
    }).max(18, {
        message: "Community name must be up to 18 characters."
    }),
});

export const SubforumSubscriptionValidator = z.object({
    subforumId: z.string()
});

export type CreateSubForumPayload = z.infer<typeof SubforumValidatorSchema>;
export type SubscribeToSubForumPayload = z.infer<typeof SubforumSubscriptionValidator>;



// Post Validator
export const PostValidator = z.object({
    title: z.string().min(3, {
        message: 'Title must be at least 3 characters long',
    }).max(128, {
        message: 'Title must be less than 128 characters long',
    }),
    subforumId: z.string(),
    content: z.any(),
})

export type PostCreationRequest = z.infer<typeof PostValidator>