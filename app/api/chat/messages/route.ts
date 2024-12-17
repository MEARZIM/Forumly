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
      message,
      image,
      conversationId
    } = body;

    if (!currentUser) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const newMessage = await db.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: {
            id: conversationId
          }
        },
        sender: {
          connect: {
            id: currentUser.user.id
          }
        },
        seen: {
          connect: {
            id: currentUser.user.id
          }
        }
      },
      include: {
        seen: true,
        sender: true,
      }
    });

    const updatedConversation = await db.conversation.update({
      where: {
        id: conversationId
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id
          }
        }
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true
          }
        }
      }
    });

    await pusherServer.trigger(conversationId, 'messages:new', newMessage);

    const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];

    updatedConversation.users.map((user) => {
      pusherServer.trigger(user.email!, 'conversation:update', {
        id: conversationId,
        messages: [lastMessage]
      })
    });

    return NextResponse.json(newMessage);
  } catch (error: any) {
    console.log(error, 'ERROR_MESSAGES');
    return new NextResponse('InternalError', { status: 500 });
  }
}