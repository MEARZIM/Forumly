"use server"

import { db } from "@/lib/db";
import { getAuthSession } from "@/auth";

const getConversationById = async (
  conversationId: string
) => {
  try {
    const currentUser = await getAuthSession();

    if (!currentUser?.user.name) {
      return null;
    }

    const conversation = await db.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        users: true
      }
    });

    return conversation;
  } catch (error: any) {
    return null;
  }
};

export default getConversationById;