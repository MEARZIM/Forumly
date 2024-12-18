"use server"

import { getAuthSession } from "@/auth";
import { db } from "@/lib/db";

const getCurrentUser = async () => {
  try {
    const session = await getAuthSession();

    if (!session?.user.username) {
      return null;
    }
    // console.log(session)
    
    const currentUser = await db.user.findUnique({
      where: {
        username: session.user.username as string
      },
      include: {
        seenMessages: true,
        conversations:true
      }
    });
    // console.log(currentUser)

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    return null;
  }
}

export default getCurrentUser;