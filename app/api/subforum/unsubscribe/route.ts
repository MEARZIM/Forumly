import { z } from "zod";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getAuthSession } from "@/auth";
import { SubforumSubscriptionValidator } from "@/validators";

export async function POST(req: Request) {
    try {
        const session = await getAuthSession();

        if (!session?.user) {
            return new NextResponse('UnAuthorized', {
                status: 401,
            })
        }

        const body = await req.json();

        const { subforumId } = SubforumSubscriptionValidator.parse(body);

        const subscriptionExists = await db.subscription.findFirst({
            where: {
                subforumId,
                userId: session.user.id
            }
        })

        if (!subscriptionExists) {
            return new NextResponse('You are not subscribed.', {
                status: 400,
            })
        }

        // Check if the user is the creator of the subforum
        const creator = await db.subforum.findFirst({
            where : {
                id: subforumId,
                creatorId: session.user.id
            }
        })

        if (creator) {
            return new NextResponse('You can not unsubscribe this forum beacuse you created it.', {
                status: 402,
            })
        }

        await db.subscription.deleteMany({
            where: {
                subforumId: subforumId,
                userId: session.user.id,
            },
        });


        return NextResponse.json(subforumId, { status: 200 });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(error.message, { status: 422 });
        }

        return new NextResponse("Internal Server Error", { status: 500 });
    }
}