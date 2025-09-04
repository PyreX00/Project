'use client'

import { useRouter } from "next/navigation";
import { ConversationType } from "@/app/inbox/page";

interface ConversationProps {
    conversation: ConversationType;
    userId: string;
}

const Conversation: React.FC<ConversationProps> = ({
    conversation,
    userId
}) => {
    const router = useRouter();
    
    // Debug: Log the conversation data
    console.log('Conversation object:', conversation);
    console.log('Users array:', conversation?.users);
    console.log('UserId:', userId);
    
    // Safety check: ensure conversation and users exist before calling find
    const otherUser = conversation?.users?.find((user) => user.id !== userId);
    
    // Early return if conversation data is incomplete
    if (!conversation || !conversation.users) {
        return (
            <div className="px-6 py-4 border border-gray-300 rounded-xl">
                <p className="text-gray-500">Loading conversation...</p>
                <p className="text-xs text-gray-400">
                    Debug: conversation={JSON.stringify(conversation, null, 2)}
                </p>
            </div>
        );
    }

    return (
    <div className="px-6 py-4 mb-5 border cursor-pointer border-gray-300 rounded-xl">
        <p className="mb-6 text-xl">{otherUser?.name || 'Unknown User'}</p>

        <p
        className="text-airbnb-dark cursor-pointer hover:underline"
        onClick={() => router.push(`/inbox/${conversation.id}`)}
        >
        Go to Conversation
        </p>
    </div>
    );

}

export default Conversation;