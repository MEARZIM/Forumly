import { z } from 'zod'
import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { getAuthSession } from '@/auth'
import { PostValidator } from '@/validators'

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const { title, content, subforumId } = PostValidator.parse(body)

        const session = await getAuthSession()

        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 })
        }

        const subscription = await db.subscription.findFirst({
            where: {
                subforumId: subforumId,
                userId: session.user.id,
            },
        })

        if (!subscription) {
            return new Response('Subscribe to post', { status: 403 })
        }

        await db.post.create({
            data: {
                title,
                content,
                authorId: session.user.id,
                subForumId: subforumId
            },
        })

        return NextResponse.json('Success', { status: 200 });
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