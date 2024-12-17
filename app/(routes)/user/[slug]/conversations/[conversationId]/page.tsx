import { notFound } from "next/navigation";

import Conversation from "./components/Conversation";
import getMessages from "@/actions/getMessages";



const ConversationPage = async ({
  params,
}: {
  params: Promise<{ conversationId: string }>;
}) => {

  const slug = (await params).conversationId;
  const messages = await getMessages(slug);

  if (!slug) {
    return notFound();
  }

  return (
    <>
      <Conversation conversationId={slug} messages={messages}/>
    </>
  )
};

export default ConversationPage;