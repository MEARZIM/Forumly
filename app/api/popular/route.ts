import { z } from "zod";
import { NextResponse } from "next/server";

import { getAuthSession } from "@/auth";
import { db } from "@/lib/db";

import { UrlValidator } from "../post/constant";


export async function GET(req: Request) {
    try {
        const url = new URL(req.url);


        const {
            limit,
            page,
        } = UrlValidator.parse({
            limit: url.searchParams.get('limit'),
            page: url.searchParams.get('page'),
        });

        // Fetch popular posts
        const posts = await db.post.findMany({
            take: parseInt(limit),
            skip: (parseInt(page) - 1) * parseInt(limit, 10),
            orderBy: [
                {
                    votes: {
                        _count: 'desc', // Order by vote count
                    },
                },
                {
                    comments: {
                        _count: 'desc', // Secondary order by comment count
                    },
                },
                {
                    createdAt: 'desc', // Tiebreaker by recent creation
                },
            ],
            include: {
                subForum: true,
                votes: true,
                author: true,
                comments: true,
                SavedPost: true,
            },
        });

        return NextResponse.json(posts, {
            status: 200,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(error.message, { status: 400 });
        }
        return new NextResponse(
            'Failed to load popular posts. Please try again later...',
            { status: 500 }
        );
    }
}
