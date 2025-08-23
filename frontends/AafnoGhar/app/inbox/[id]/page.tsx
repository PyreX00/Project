import ConversationDetail from "@/app/components/inbox/ConversationDetail";
import { getUserId, getAccessToken } from "@/app/lib/actions";
import React from "react"; 
import { UserType } from "../page";
import apiService from "@/app/services/apiService";

export type MessageType = {
    id: string;
    name: string;
    body: string;
    conversationId: string;
    sent_to: UserType;
    created_by: UserType;
}

// Fix the params type for Next.js 15+
interface ConversationPageProps {
    params: Promise<{ id: string }>;
}

const ConversationPage = async ({ params }: ConversationPageProps) => {
    // Await the params promise
    const { id } = await params;
    
    const userId = await getUserId();
    const token = await getAccessToken();

    if (!userId || !token) {
        return (
            <main className="max-w-[1500px] mx-auto px-6 py-12">
                <p>You need to be authenticated....</p>
            </main>
        );
    }

    try {
        // Use the awaited id parameter
        const conversation = await apiService.get(`/api/chat/${id}/`);

        return (
            <main className="max-w-[2000px] mx-auto px-6 pb-6">
                <ConversationDetail
                    token={token}
                    userId={userId}
                    messages={conversation.messages}
                    conversation={conversation.conversation}
                />
            </main>
        );
    } catch (error) {
        console.error('Error fetching conversation:', error);
        return (
            <main className="max-w-[1500px] mx-auto px-6 py-12">
                <p>Error loading conversation. Please try again.</p>
            </main>
        );
    }
}

export default ConversationPage;