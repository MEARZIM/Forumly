import { z } from "zod"
import { NextResponse } from "next/server"

import { db } from "@/lib/db"
import { getAuthSession } from "@/auth"
import { CommentValidator } from "@/validators"

export async function PATCH(req: Request) {
    try {

        const session = await getAuthSession()

        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const body = await req.json()

        const { postId, text, replyToId } = CommentValidator.parse(body);

        await db.comment.create({
            data: {
                text,
                postId,
                authorId: session.user.id,
                replyToId,
            },
        })

        return NextResponse.json("Comment Posted", {
            status: 200,
        })

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