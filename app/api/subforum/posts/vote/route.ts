import { z } from "zod"
import { NextResponse } from "next/server"

import { getAuthSession } from "@/auth";
import { PostVoteValidator } from "@/validators";
import { db } from "@/lib/db";
import { CachedPost } from "@/types/redis";


const CACHE_AFTER_UPLOAD = 1;

export async function PATCH(req: Request) {
    try {

        const body = await req.json();
        const {
            postId,
            voteType
        } = PostVoteValidator.parse(body);

        const session = await getAuthSession();

        if (!session?.user) {
            return new NextResponse("Unauthenticated", {
                status: 401,
            })
        }

        const existVote = await db.vote.findFirst({
            where: {
                userId: session.user.id,
                postId
            }
        })

        const post = await db.post.findUnique({
            where: {
                id: postId,
            },
            include: {
                author: true,
                votes: true
            }
        })

        if (!post) {
            return new NextResponse("No post found", {
                status: 404,
            })
        }

        if (existVote) {
            if (existVote.type === voteType) {
                await db.vote.deleteMany({
                    where: {
                        userId: session.user.id,
                        postId: postId,
                    },
                });
                return NextResponse.json("Vote Deleted", {
                    status: 200,
                })
            }

            // if vote type doesn't Match then Update the Vote
            const voteToUpdate = await db.vote.findFirst({
                where: {
                    postId: postId,
                    userId: session.user.id,
                },
            });
            if (voteToUpdate) {
                await db.vote.update({
                    where: {
                        id: voteToUpdate.id,
                    },
                    data: {
                        type: voteType,
                    },
                });
            }

            // Recount the votes
            const voteCount = post.votes.reduce((count, vote) =>{
                if(vote.type === 'UP') {
                    return count+1
                }
                if(vote.type === 'DOWN') {
                    return count-1
                }
                return count
            },0);

            if (voteCount >= CACHE_AFTER_UPLOAD) {
                const cachePayload: CachedPost = {
                    id: post.id,
                    authorUsername: post.author.username ?? "",
                    content: JSON.stringify(post.content),
                    title: post.title,
                    createdAt: post.createdAt,
                    currentVote: voteType,
                }
            }
        }


    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(error.message, { status: 400 })
        }

        return new NextResponse(
            'Failed to post the subforum. Please try again later...',
            { status: 500 }
        )
    }
}