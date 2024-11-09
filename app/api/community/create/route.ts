import { getAuthSession } from "@/auth";
import { db } from "@/lib/db";
import { SubforumValidatorSchema } from "@/validators";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const session = await getAuthSession();

        if (!session?.user) {
            return new NextResponse('UnAuthorized', {
                status: 401,
            })
        }

        const body = await req.json();

        const { name } = SubforumValidatorSchema.parse(body);

        const subForumExists = await db.subforum.findFirst({
            where: {
                name: name,
            }
        })

        if (subForumExists) {
            return new NextResponse('Subforum already exists', {
                status: 409,
            })
        }

        const subforum = await db.subforum.create({
            data: { name, creatorId: session.user.id }
        })

        await db.subscription.create({
            data: {
                userId: session.user.id,
                subforumId: subforum.id,
            }
        })

        return NextResponse.json(subforum.name, { status: 200 });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(error.message, { status: 422 });
        }

        return new NextResponse("Internal Server Error", { status: 500 });
    }
}