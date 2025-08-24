'use client'
import useLoginModal from "../hooks/useLoginModal";
import { useRouter } from "next/router";
import apiService from "../services/apiService";

interface ContactButtonProps{
    userId: string | null;
    landlordId: string;
    propertyTitle?: string;
    userName?: string;
    userProfession?: string;
}

const ReservationButton: React.FC<ContactButtonProps> = ({
    userId,
    landlordId,
    propertyTitle = "this property",
    userName = "A potential tenant",
    userProfession = "professional"
}) => {

    const loginModal = useLoginModal()
    const router = useRouter();

    const startConversation = async () => {
        if (userId) {
            try {
                // Start the conversation
                console.log('Starting conversation with landlord:', landlordId);
                const conversation = await apiService.get(`/api/chat/start/${landlordId}/`)
                console.log('Conversation response:', conversation);

                if (conversation.conversation_id) {
                    // Send automated message
                    const automatedMessage = `Hello! ${userName} who is a ${userProfession} wants to visit the property "${propertyTitle}". Please let us know available times for a viewing. Thank you!`;
                    
                    console.log('Sending automated message:', automatedMessage);
                    console.log('To conversation ID:', conversation.conversation_id);
                    
                    // Based on your API pattern, try sending to the conversation detail endpoint
                    try {
                        // This matches your API pattern: /api/chat/{conversation_id}/
                        console.log('🚀 Attempting to send message via POST...');
                        const messageResponse = await apiService.post(`/api/chat/${conversation.conversation_id}/`, {
                            body: automatedMessage  // Try 'body' instead of 'message'
                        });
                        console.log('✅ Message sent successfully:', messageResponse);
                    } catch (messageError) {
                        console.log('❌ Failed with body, trying message field:', messageError);
                        
                        try {
                            // Try with 'message' field
                            console.log('🚀 Attempting to send with message field...');
                            const messageResponse = await apiService.post(`/api/chat/${conversation.conversation_id}/`, {
                                message: automatedMessage
                            });
                            console.log('✅ Message sent successfully with message field:', messageResponse);
                        } catch (messageError2) {
                            console.log('❌ Both attempts failed. Message might be sent via WebSocket or conversation creation includes initial message');
                            console.log('messageError2:', messageError2);
                        }
                    }

                    // Navigate to the conversation
                    router.push(`/inbox/${conversation.conversation_id}`)
                } else {
                    console.error('No conversation_id in response:', conversation);
                    alert("Error starting conversation. Please try again.");
                }
            } catch (error) {
                console.error('Error starting conversation or sending message:', error);
                alert("Error booking appointment. Please try again.");
            }
        } else {
            loginModal.open();
        }
    }

    return(
        <button
            onClick={startConversation}
            className="w-full mb-5 py-4 text-xl text-center text-white bg-airbnb rounded-xl hover:bg-airbnb-dark transition-colors font-semibold"
        >
            Book an Appointment
        </button>
    )
}

export default ReservationButton