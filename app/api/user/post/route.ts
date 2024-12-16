import { z } from "zod";
import { NextResponse } from "next/server";

import { getAuthSession } from "@/auth";
import { db } from "@/lib/db";

import { UrlValidatorForUserProfile } from "../../post/constant";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const session = await getAuthSession();

        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 });
        }

        const {
            tabName,
            username,
            page,
            limit
        } = UrlValidatorForUserProfile.parse({
            tabName: url.searchParams.get('tabName'),
            username: url.searchParams.get('username'),
            limit: url.searchParams.get('limit'),
            page: url.searchParams.get('page')
        });

        if (!username || !tabName) {
            return new Response('Unauthorized', { status: 401 });
        }

        const parsedLimit = parseInt(limit);
        const parsedPage = parseInt(page);
        const skip = (parsedPage - 1) * parsedLimit;

        if (tabName === "overview") {
            const posts = await db.post.findMany({
                take: parsedLimit,
                skip,
                orderBy: { createdAt: 'desc' },
                include: {
                    subForum: true,
                    votes: true,
                    author: true,
                    comments: true,
                },
                where: {
                    OR: [
                        { author: { username } },
                        { votes: { some: { user: { username } } } }, // User-voted posts
                        { comments: { some: { author: { username } } } } // User-commented posts
                    ],
                },
            });
            return NextResponse.json(posts, { status: 200 });
        } else if (tabName === "posts") {
            const posts = await db.post.findMany({
                take: parsedLimit,
                skip,
                orderBy: { createdAt: 'desc' },
                include: {
                    subForum: true,
                    votes: true,
                    author: true,
                    comments: true,
                },
                where: {
                    author: { username: username },
                },
            });
            return NextResponse.json(posts, { status: 200 });
        } else if (tabName === "comments") {
            const posts = await db.post.findMany({
                take: parsedLimit,
                skip,
                orderBy: { createdAt: 'desc' },
                include: {
                    subForum: true,
                    votes: true,
                    author: true,
                    comments: true,
                },
                where: {
                    comments: {
                        some: { author: { username } },
                    },
                },
            });
            return NextResponse.json(posts, { status: 200 });
        } else {
            return new Response('Invalid tab name', { status: 400 });
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 400 });
        }
        return new Response(
            'Failed to load more posts. Please try again later...',
            { status: 500 }
        );
    }
}
