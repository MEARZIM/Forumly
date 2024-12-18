import { notFound } from "next/navigation";
import getMessages from "@/actions/getMessages";
import Body from "../../user/[slug]/conversations/[conversationId]/components/Body";
import Form from "../../user/[slug]/conversations/[conversationId]/components/Form";
import Header from "./components/Header";
import getConversationById from "@/actions/getConversationById";
import EmptyState from "../../user/[slug]/conversations/[conversationId]/components/EmptyState";



const ConversationPage = async ({
    params,
}: {
    params: Promise<{ conversationId: string }>;
}) => {

    const slug = (await params).conversationId;
    const messages = await getMessages(slug);
    const conversation = await getConversationById(slug);

    if (!conversation) {
        return (
            <div className="lg:pl-80 h-full">
                <div className="h-full flex flex-col">
                    <EmptyState />
                </div>
            </div>
        );
    }

    return (
        <>
                <div className="h-full flex lg:pl-[196px] flex-col">
                    <Header conversation={conversation} />
                    <Body initialMessages={messages} />
                    <Form />
                </div>
        </>
    )
};

export default ConversationPage;