"use client";

import React, { useCallback } from "react";
import { Menu, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

// Type definition for props
interface Props {
  userData: string;
}

// Component
const ProfileHeader = ({ userData }: Props) => {
  const sidebar = useSidebar();
  const { data: session } = useSession();
  const router = useRouter();

  // React Query Mutation to create a new conversation
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post("/api/chat/conversations", {
        username: userData, // Ensure session.user exists
      });

      console.log(data);

      return data; // API response containing conversation ID
    },
    onSuccess: (conversationData) => {
      // Navigate to the conversation route using returned data
      router.push(`/user/${userData}/conversations/${conversationData.id}`);
    },
    onError: (error) => {
      console.error("Failed to create conversation:", error);
      
    },
  });

  // Button click handler
  const handleClick = useCallback(() => {
    console.log(session)
    if (!session?.user.id) {
      console.error("No user session found.");
      return;
    }
    mutate();
  }, [mutate, session]);

  return (
    <div className="flex flex-row bg-inherit items-center justify-between gap-4">
      <div>
        <div className="pb-2">
          <Avatar className="w-16 h-16 bg-yellow-300">
            <AvatarFallback className="bg-white">
              {userData.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">{userData}</h1>
              <p className="text-sm text-muted-foreground">u/{userData}</p>
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0">
              {userData !== session?.user?.username && (
                <Button
                  onClick={handleClick}
                  disabled={isPending}
                  className="flex-1 flex items-center gap-1 bg-blue-600 text-white hover:bg-blue-700 sm:flex-none"
                >
                  <MessageCircle className="h-4 w-4 mb-1" />
                  {isPending ? "Loading..." : "Chat"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Open Sidebar Button for Mobile */}
      <div className="p-4 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={sidebar.onOpen}
          className="flex justify-center items-center"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
