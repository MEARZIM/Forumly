import { z } from "zod";
import { NextResponse } from "next/server";

import { getAuthSession } from "@/auth";
import { db } from "@/lib/db";

// Define a schema to validate the request body
const savePostSchema = z.object({
    postId: z.string(),
});

export async function POST(req: Request) {
    try {
        const session = await getAuthSession();

        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { postId } = savePostSchema.parse(body);
        //console.log(postId);


        // Check if the post is already saved by the user
        const existingSave = await db.savedPost.findFirst({
            where: {
                postId,
                userId: session.user.id,
            },
        });

        console.log(existingSave);


        if (existingSave) {
            // If already saved, remove it (unsave)
            await db.savedPost.delete({
                where: { id: existingSave.id },
            });
            return NextResponse.json({ message: "Post unsaved" }, { status: 200 });
        } else {
            // Otherwise, save the post
            console.log("Post does not exist");

            const res = await db.savedPost.create({
                data: {
                    postId,
                    userId: session.user.id,
                },
            });
            console.log(res);

            return NextResponse.json({ message: "Post saved" }, { status: 200 });
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(error.message, { status: 400 });
        }
        console.log(error);

        return new NextResponse(
            "Failed to save/unsave post. Please try again later...",
            { status: 500 }
        );
    }
}
