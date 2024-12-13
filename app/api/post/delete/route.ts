import { NextResponse } from "next/server";
import { Post, User, Vote } from "@prisma/client";
import { UTApi } from "uploadthing/server";

import { db } from "@/lib/db";
import { getAuthSession } from "@/auth";

const utapi = new UTApi();

type UserPost = Post & {
    author: User;
    votes: Vote[];
};

export async function POST(req: Request) {
    try {
        const session = await getAuthSession();

        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 });
        }

        const body = await req.json();

        const post: UserPost = body.post;


        if (!post) {
            return new Response('Post ID is required', { status: 400 });
        }

        if (session?.user.id !== post.authorId) {
            return new Response('Unauthorized', { status: 401 });
        }


        (post.content as { blocks: any[] })?.blocks?.map(async (block) => {
            if (block.type === 'image') {
                //block.data.file.url = https://utfs.io/f/X9ytV3B4p8mwlD4xULdjbzDVL5KsW3mIMc48uwy0rHkaShio
                const url = block.data.file.url.split('/').pop() //Example Output: X9ytV3B4p8mwlD4xULdjbzDVL5KsW3mIMc48uwy0rHkaShio
                await utapi.deleteFiles(url);
            }
        });


        await db.post.delete({
            where: { id: post.id },
        });

        return NextResponse.json({ message: 'Success' }, { status: 200 });
    } catch (err:any) {

        return new NextResponse(
            'Failed to post the subforum. Please try again later...',
            { status: 500 }
        );
    }
}
