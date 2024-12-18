import getConversations from "@/actions/getConversation";
import getUsers from "@/actions/getUsers";
import ConversationList from "./components/ConversationList";


export default async function ConversationsLayout({
  children
}: {
  children: React.ReactNode
}) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
      
      <div className="h-full w-full">
        <ConversationList
          users={users}
          initialItems={conversations}
        />
        {children}
      </div>
  )
};