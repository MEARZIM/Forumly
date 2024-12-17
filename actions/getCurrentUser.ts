"use server"

import { db } from "@/lib/db";
import { useSession } from "next-auth/react";

const getCurrentUser = async () => {
  try {
    const { data: session } = useSession();

    if (!session?.user.username) {
      return null;
    }
    console.log(session)
    
    const currentUser = await db.user.findUnique({
      where: {
        username: session.user.username as string
      }
    });
    console.log(currentUser)

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    return null;
  }
}

export default getCurrentUser;