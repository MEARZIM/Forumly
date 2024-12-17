import { z } from "zod";
import { NextResponse } from "next/server";

import { getAuthSession } from "@/auth";
import { db } from "@/lib/db";

import { UrlValidator } from "./constant";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);

        const session = await getAuthSession();

        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 });
        }

        const followedCommunities = await db.subscription.findMany({
            where: {
                userId: session.user.id
            },
            include: {
                subforum: true
            }
        })

        const followedCommunitiesIds = followedCommunities.map(({ subforum }) => {
            return subforum.id
        })

        const {
            subforumName,
            page,
            limit
        } = UrlValidator.parse({
            subforumName: url.searchParams.get('subforumName'),
            limit: url.searchParams.get('limit'),
            page: url.searchParams.get('page')
        })

        // Different for different conditons
        let whereClause = {}

        const validCommunityIds = (followedCommunitiesIds || []).filter(id => typeof id === 'string') as string[];

        if (subforumName) {
            whereClause = {
                subForum: {
                    name: subforumName as string,
                }
            };
        } else if (session) {
            if (validCommunityIds.length === 0) {
                whereClause = {};
            } else {
                whereClause = {
                    subForum: {
                        id: {
                            in: validCommunityIds
                        }
                    },
                };
            };
        }
        // console.log(whereClause, validCommunityIds)

        const posts = await db.post.findMany({
            take: parseInt(limit),
            skip: (parseInt(page) - 1) * parseInt(limit, 10),
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                subForum: true,
                votes: true,
                author: true,
                comments: true,
                SavedPost: true,
            },
            where: whereClause
        })

        return NextResponse.json(posts, {
            status: 200
        })

    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(error.message, { status: 400 })
        }
        return new NextResponse(
            'Failed to load more posts. Please try again later...',
            { status: 500 }
        );
    }
}