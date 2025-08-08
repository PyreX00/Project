'use client'
import useWebSocket, { ReadyState } from "react-use-websocket";
import CustomButton from "../forms/CustomButton";
import { ConversationType } from "@/app/inbox/page";
import { useEffect, useState, useRef } from "react";
import { MessageType } from "@/app/inbox/[id]/page";
import { UserType } from "@/app/inbox/page";

interface ConversationDetailProps {
    userId: string;
    token: string;
    conversation: ConversationType;
    messages:MessageType[]
}

const ConversationDetail: React.FC<ConversationDetailProps> = ({
    userId,
    token,
    messages,
    conversation
}) => {
    const messagesDiv = useRef<HTMLDivElement>(null);
    const [newMessage, setNewMessage] = useState('');
    const myUser = conversation?.users?.find((user) => user.id == userId);
    const otherUser = conversation?.users?.find((user) => user.id !== userId);

    const [realtimeMessages, setRealtimeMessages] = useState<MessageType[]>([]);

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
        `ws://127.0.0.1:8000/ws/${conversation.id}/?token=${token}`,
        {
            share: false,
            shouldReconnect: () => true
        }
    );


    useEffect(() => {
        console.log("Connection state changed", readyState);
    }, [readyState]);

    // Fix: Move scrollToBottom function outside of sendMessage and useEffect
    const scrollToBottom = () => {
        if (messagesDiv.current) {
            messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
        }
    };

    useEffect(() => {
        if (lastJsonMessage && typeof lastJsonMessage === 'object' && 'name' in lastJsonMessage && 'body' in lastJsonMessage) {
            console.log('Received message:', lastJsonMessage);
            
            const message: MessageType = {
                id: '', // You might want to generate a proper ID
                name: lastJsonMessage.name as string,
                body: lastJsonMessage.body as string,
                sent_to: otherUser as UserType,
                created_by: myUser as UserType,
                conversationId: conversation.id
            };

            // Fix: Use functional update to avoid stale closure
            setRealtimeMessages((prevMessages) => [...prevMessages, message]);
        }

        // Scroll to bottom when new message arrives
        setTimeout(() => {
            scrollToBottom();
        }, 100);
    }, [lastJsonMessage, otherUser, myUser, conversation.id]); // Fix: Remove colon, add dependencies

    const sendMessage = async () => {
        if (!newMessage.trim()) return; // Don't send empty messages

        // Fix: Correct the typo from 'even' to 'event'
        sendJsonMessage({
            event: 'chat_message',
            data: {
                body: newMessage,
                name: myUser?.name,
                sent_to_id: otherUser?.id,
                conversation_id: conversation.id
            }
        });

        setNewMessage('');

        // Scroll to bottom after sending
        setTimeout(() => {
            scrollToBottom();
        }, 50);
    };

    // Handle Enter key press
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            <div 
                ref={messagesDiv}
                className="max-h-[400px] overflow-auto flex flex-col space-y-4 p-4">
                
                 {/* Show existing messages first */}
                {messages && messages.length > 0 ? (
                    messages.map((message, index) => (
                        <div 
                            key={`existing-${message.id || index}`}
                            className={`w-[80%] py-4 px-6 rounded-xl ${
                                message.created_by.name === myUser?.name 
                                    ? 'ml-[20%] bg-blue-200' 
                                    : 'bg-gray-200'
                            }`}>
                            <p className="font-bold text-gray-500">{message.created_by.name}</p>
                            <p>{message.body}</p>
                        </div>
                    ))
                ) : null}

                {/* Show realtime messages */}
                {realtimeMessages.map((message, index) => (
                    <div 
                        key={`realtime-${message.id || index}`}
                        className={`w-[80%] py-4 px-6 rounded-xl ${
                            message.name === myUser?.name 
                                ? 'ml-[20%] bg-blue-200' 
                                : 'bg-gray-200'
                        }`}>
                        <p className="font-bold text-gray-500">{message.name}</p>
                        <p>{message.body}</p>
                    </div>
                ))}

                {/* Show message when no messages exist */}
                {(!messages || messages.length === 0) && realtimeMessages.length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                        No messages yet. Start the conversation!
                    </div>
                )}
            </div>

            <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
                <input 
                    type="text"
                    placeholder="Type your message"
                    className="w-full p-2 bg-gray-200 rounded-xl"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={readyState !== ReadyState.OPEN}
                />

                <CustomButton
                    label='Send'
                    onClick={sendMessage}
                    className="w-[100px]"
                />
            </div>
        </>
    );
};

export default ConversationDetail;