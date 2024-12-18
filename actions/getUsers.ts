import { getAuthSession } from "@/auth";
import { db } from "@/lib/db";

const getUsers = async () => {
  const session = await getAuthSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const users = await db.user.findMany({
      where: {
        NOT: {
          email: session.user.email
        }
      }
    });

    return users;
  } catch (error: any) {
    return [];
  }
};

export default getUsers;