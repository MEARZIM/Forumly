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
                id: subforumId,
                userId: session.user.id
            }
        })

        if (subscriptionExists) {
            return new NextResponse('You already subscribed to this Subforum', {
                status: 400,
            })
        }


        await db.subscription.create({
            data: {
                userId: session.user.id,
                subforumId: subforumId,
            }
        })

        return NextResponse.json(subforumId, { status: 200 });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(error.message, { status: 422 });
        }

        return new NextResponse("Internal Server Error", { status: 500 });
    }
}