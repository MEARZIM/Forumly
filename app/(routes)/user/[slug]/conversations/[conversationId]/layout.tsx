import { notFound } from "next/navigation";

import getMessages from "@/actions/getMessages";



const ConversationPage = async ({
  params,
  children
}: {
  params: Promise<{ conversationId: string }>;
  children: React.ReactNode
}) => {

  const slug = (await params).conversationId;
  const messages = await getMessages(slug);

  if (!slug) {
    return notFound();
  }

  return (
    <>
      {children}
    </>
  )
};

export default ConversationPage;