import { NextResponse } from "next/server";
import { getAuthSession } from "@/auth";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

interface IParams {
  conversationId?: string;
};

export async function POST(
  request: Request,
  {
    params
  }:{
    params: Promise<{ conversationId: string }>
  }
) {
  try {
    const currentUser = await getAuthSession();
    const conversationId  = (await params).conversationId;

    if (!currentUser) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    // Find the existing conversation
    const conversation = await db.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        messages: {
          include: {
            seen: true,
          }
        },
        users: true,
      }
    });

    if (!conversation) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    // Find the last message
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    // Update seen of last message
    const updatedMessage = await db.message.update({
      where: {
        id: lastMessage.id
      },
      include: {
        sender: true,
        seen: true
      },
      data: {
        seen: {
          connect: {
            id: currentUser.user.id
          }
        }
      }
    });

    await pusherServer.trigger(currentUser.user.email!, 'conversation:update', {
      id: conversationId,
      messages: [updatedMessage]
    });

    if (lastMessage.seenIds.indexOf(currentUser.user.id) !== -1) {
      return NextResponse.json(conversation);
    }

    await pusherServer.trigger(conversationId!, 'message:update', updatedMessage);

    return NextResponse.json(updatedMessage);
  } catch (error: any) {
    console.log(error, 'ERROR_MESSAGES_SEEN');
    return new NextResponse("Internal Error", { status: 500 });
  }
}