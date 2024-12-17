"use client"


import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Body from "./Body";
import Form from "./Form";
import { FullMessageType } from "@/types/conversation";


interface Props {
    conversationId: string
    messages: FullMessageType[]
}

const Conversation = ({
    conversationId,
    messages
}: Props) => {
  const [isOpen, setIsOpen] = useState(true)
  const router = useRouter();

  useEffect(()=> {
    if (isOpen === false) {
      setIsOpen(false);
      router.back();
    }
  },[isOpen])


  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-[400px] sm:w-[700px]">
          <SheetHeader>
            <SheetTitle>Chat</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col h-[calc(100vh-120px)]">
            <ScrollArea className="flex-grow p-4 space-y-4">
            <Body initialMessages={messages} />
            </ScrollArea>
            <Form />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
};

export default Conversation;