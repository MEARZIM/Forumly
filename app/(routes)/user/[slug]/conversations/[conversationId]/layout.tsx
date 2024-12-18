import { notFound } from "next/navigation";


const ConversationPage = async ({
  params,
  children
}: {
  params: Promise<{ conversationId: string }>;
  children: React.ReactNode
}) => {

  const slug = (await params).conversationId;

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