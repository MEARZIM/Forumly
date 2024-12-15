import { z } from 'zod'
import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { getAuthSession } from '@/auth'
import { CommentVoteValidator } from '@/validators'

export async function PATCH(req: Request) {
    try {
        const body = await req.json()

        const { commentId, voteType } = CommentVoteValidator.parse(body)

        const session = await getAuthSession()

        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 })
        }

        // check if user has already voted on this post
        const existingVote = await db.commentVote.findFirst({
            where: {
                userId: session.user.id,
                commentId,
            },
        })

        if (existingVote) {
            // if vote type is the same as the existing vote, delete the vote
            if (existingVote.type === voteType) {
                await db.commentVote.delete({
                    where: {
                        id: existingVote.id, // Use the unique ID of the vote
                    },
                });
                return new Response('OK');
            } else {
                // if vote type is different, update the vote
                await db.commentVote.update({
                    where: {
                        id: existingVote.id, // Use the unique ID of the vote
                    },
                    data: {
                        type: voteType,
                    },
                });
                return new Response('OK');
            }
        }


        // if no existing vote, create a new vote
        await db.commentVote.create({
            data: {
                type: voteType,
                userId: session.user.id,
                commentId,
            },
        })

        return new Response('OK')
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(error.message, { status: 400 })
        }

        return new NextResponse(
            'Failed to vote the subforum. Please try again later...',
            { status: 500 }
        )
    }
}