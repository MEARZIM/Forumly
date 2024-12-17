import { getAuthSession } from "@/auth";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server";


export async function POST(
    request: Request
) {
    try {
        const currentUser = await getAuthSession();
        const body = await request.json();
        const {
            username,
        } = body;

        console.log(username)
        if (!currentUser) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const reciver = await db.user.findUnique({
            where : {
                username: username
            }
        })

        if (!reciver) {
            return new NextResponse('Unauthorized no reciever found', { status: 404 });
        }


        const exisitingConversations = await db.conversation.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [currentUser.user.id, reciver.id]
                        }
                    },
                    {
                        userIds: {
                            equals: [reciver.id, currentUser.user.id]
                        }
                    }
                ]
            }
        });

        const singleConversation = exisitingConversations[0];

        if (singleConversation) {
            return NextResponse.json(singleConversation);
        }

        const newConversation = await db.conversation.create({
            data: {
                users: {
                    connect: [
                        {
                            id: currentUser.user.id
                        },
                        {
                            id: reciver.id
                        }
                    ]
                }
            },
            include: {
                users: true
            }
        });

        newConversation.users.map((user) => {
            if (user.email) {
                pusherServer.trigger(user.email, 'conversation:new', newConversation);
            }
        })

        return NextResponse.json(newConversation);
    } catch (error) {
        return new NextResponse('Internal Error', { status: 500 });
    }
}