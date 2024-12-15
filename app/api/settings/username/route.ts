import { getAuthSession } from '@/auth'
import { db } from '@/lib/db'
import { UsernameValidator } from '@/validators'
import { NextResponse } from 'next/server'

import { z } from 'zod'

export async function PATCH(req: Request) {
    try {
        const session = await getAuthSession()

        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const body = await req.json()
        const { name } = UsernameValidator.parse(body)

        // check if username is taken
        const username = await db.user.findFirst({
            where: {
                username: name,
            },
        })

        if (username) {
            return new NextResponse('Username is taken', { status: 409 })
        }

        // update username
        await db.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                username: name,
            },
        })

        return NextResponse.json('username updated', { status:200 });
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