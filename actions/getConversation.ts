import { getAuthSession } from "@/auth";
import getCurrentUser from "./getCurrentUser";
import { db } from "@/lib/db";

const getConversations = async () => {
  const currentUser = await getAuthSession();

  if (!currentUser?.user.id) {
    return [];
  }

  try {
    const conversations = await db.conversation.findMany({
      orderBy: {
        lastMessageAt: 'desc'
      },
      where: {
        userIds: {
          has: currentUser.user.id
        }
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true
          }
        }
      }
    });

    return conversations;
  } catch (error: any) {
    return [];
  }
};

export default getConversations;