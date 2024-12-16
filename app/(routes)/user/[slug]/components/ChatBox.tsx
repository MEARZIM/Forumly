'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useChatbox } from '@/hooks/use-chatbox'

export default function ChatBox() {
    const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([]);
    const [inputValue, setInputValue] = useState("");
    const chatBox = useChatbox();
  
    const sendMessage = () => {
      if (inputValue.trim() === "") return;
      setMessages((prev) => [...prev, { text: inputValue, sender: "user" }]);
      setInputValue("");
    };

  
    return (
      <Sheet open={chatBox.isOpen} onOpenChange={chatBox.onClose}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Chat</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col h-[calc(100vh-120px)]">
            <ScrollArea className="flex-grow p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg ${
                    message.sender === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-200 text-black"
                  } max-w-[70%]`}
                >
                  {message.text}
                </div>
              ))}
            </ScrollArea>
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                />
                <Button onClick={sendMessage}>Send</Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
}

