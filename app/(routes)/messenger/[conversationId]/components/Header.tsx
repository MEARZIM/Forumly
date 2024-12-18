"use client";

import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import useOtherUser from "@/hooks/useOtherUser";
import { ChevronLeft } from "lucide-react";
import Avatar from "../../components/Avatar";

interface HeaderProps {
  conversation: Conversation & {
    users: User[]
  }
};

const Header: React.FC<HeaderProps> = ({
  conversation
}) => {
  const otherUser = useOtherUser(conversation);

  return (
    <>
      <div
        className="
          fixed
          z-50
          bg-white
          w-full
          flex
          border-b-[1px]
          sm:px-4
          py-3
          px-4
          lg:px-6
          justify-between
          items-center
          shadow-sm
        "
      >
        <div className="flex gap-3 items-center">
          <Link
            className="
              lg:hidden
              block
              text-blue-500
              hover:text-blue-600
              transition
              cursor-pointer
            "
            href="/messenger"
          >
            <ChevronLeft size={32} />
          </Link>
          <Avatar user={otherUser} />
          <div className="flex flex-col">
            <div>
              {conversation.name || otherUser.username}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;