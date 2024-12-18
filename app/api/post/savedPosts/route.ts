import { z } from "zod";
import { NextResponse } from "next/server";

import { getAuthSession } from "@/auth";
import { db } from "@/lib/db";
import { UrlValidator } from "../constant";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);

        const session = await getAuthSession();

        if (!session) {
            return new NextResponse(
                'Unauthenticated',
                { status: 401 }
            );
        }

        const {
            limit,
            page,
        } = UrlValidator.parse({
            limit: url.searchParams.get('limit'),
            page: url.searchParams.get('page'),
        });

        // Fetch posts saved by the current user
        const posts = await db.savedPost.findMany({
            where: {
                userId: session.user.id,  // Filter by current user's ID
            },
            take: parseInt(limit),
            skip: (parseInt(page) - 1) * parseInt(limit, 10),
            include: {
                post: {
                    include: {
                        subForum: true,
                        votes: true,
                        author: true,
                        comments: true,
                        SavedPost: true,
                    },
                },
            },
        });

        // Map the saved posts to return only the post data (removing the SavedPost object)
        const savedPosts = posts.map((savedPost) => savedPost.post);

        return NextResponse.json(savedPosts, {
            status: 200,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(error.message, { status: 400 });
        }
        return new NextResponse(
            'Failed to load saved posts. Please try again later...',
            { status: 500 }
        );
    }
}
