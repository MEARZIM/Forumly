import { z } from "zod";
import { NextResponse } from "next/server";

import { getAuthSession } from "@/auth";
import { db } from "@/lib/db";

import { UrlValidator } from "./constant";
import { ExtendedPost } from "@/types/post";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const session = await getAuthSession();

    
        const followedCommunities = await db.subscription.findMany({
            where: {
                userId: session?.user.id,
            },
            include: {
                subforum: true,
            },
        });

        const followedCommunitiesIds = followedCommunities.map(({ subforum }) => subforum.id);

        const validCommunityIds = (followedCommunitiesIds || []).filter(
            (id) => typeof id === "string"
        ) as string[];

        const { subforumName, page, limit } = UrlValidator.parse({
            subforumName: url.searchParams.get("subforumName"),
            limit: url.searchParams.get("limit"),
            page: url.searchParams.get("page"),
        });

        const take = parseInt(limit, 10);
        const skip = (parseInt(page, 10) - 1) * take;

        // Define arrays for subscribed and random posts
        let prioritizedPosts: ExtendedPost[] = [];
        let additionalPosts: ExtendedPost[] = [];

        if (subforumName) {
            // If a specific subforum is requested, fetch only from that subforum
            prioritizedPosts = await db.post.findMany({
                take,
                skip,
                orderBy: {
                    createdAt: "desc",
                },
                include: {
                    subForum: true,
                    votes: true,
                    author: true,
                    comments: true,
                    SavedPost: true,
                },
                where: {
                    subForum: {
                        name: subforumName,
                    },
                },
            });
        } else {
            // Fetch posts from subscribed communities
            if (validCommunityIds.length > 0) {
                prioritizedPosts = await db.post.findMany({
                    take,
                    skip,
                    orderBy: {
                        createdAt: "desc",
                    },
                    include: {
                        subForum: true,
                        votes: true,
                        author: true,
                        comments: true,
                        SavedPost: true,
                    },
                    where: {
                        subForum: {
                            id: {
                                in: validCommunityIds,
                            },
                        },
                    },
                });
            }

            // If subscribed posts don't fill the limit, fetch additional posts
            const remainingLimit = take - prioritizedPosts.length;
            if (remainingLimit > 0) {
                additionalPosts = await db.post.findMany({
                    take: remainingLimit,
                    skip,
                    orderBy: {
                        createdAt: "desc",
                    },
                    include: {
                        subForum: true,
                        votes: true,
                        author: true,
                        comments: true,
                        SavedPost: true,
                    },
                    where: {
                        subForum: {
                            id: {
                                notIn: validCommunityIds,
                            },
                        },
                    },
                });
            }
        }

        // Combine and remove duplicates
        const uniquePosts = Array.from(
            new Map([...prioritizedPosts, ...additionalPosts].map((post) => [post.id, post])).values()
        );

        return NextResponse.json(uniquePosts, { status: 200 });
    } catch (error) {
        console.error("Error loading posts:", error);

        if (error instanceof z.ZodError) {
            return new NextResponse(error.message, { status: 400 });
        }

        return new NextResponse(
            "Failed to load more posts. Please try again later...",
            { status: 500 }
        );
    }
}

