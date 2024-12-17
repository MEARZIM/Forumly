
import { getAuthSession } from "@/auth";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server";


export async function DELETE(
  request: Request,
  {
    params
  }:{
    params: Promise<{ conversationId: string }>
  }
) {
  try {
    const conversationId  = (await params).conversationId;
    const currentUser = await getAuthSession();

    if (!currentUser) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const existingConversation = await db.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        users: true
      }
    });

    if (!existingConversation) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    const deletedConversation = await db.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.user.id]
        }
      }
    });

    existingConversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, 'conversation:remove', existingConversation);
      }
    })

    return NextResponse.json(deletedConversation);
  } catch (error: any) {
    console.log(error, 'ERROR_CONVERSATION_DELETE');
    return new NextResponse('Internal Error', { status: 500 });
  }
} 