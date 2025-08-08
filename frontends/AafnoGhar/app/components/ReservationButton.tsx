'use client'
import useLoginModal from "../hooks/useLoginModal";
import { useRouter } from "next/router";
import apiService from "../services/apiService";


interface ContactButtonProps{
    userId: string | null;
    landlordId:string;
}

const ReservationButton: React.FC<ContactButtonProps> = ({
    userId,
    landlordId
}) =>{

    const loginModal = useLoginModal()
    const router = useRouter();

    const startConversation = async () =>{
        if (userId){
            const conversation = await apiService.get(`/api/chat/start/${landlordId}/`)

            if (conversation.conversation_id){
                router.push(`/inbox/${conversation.conversation_id}`)
            }
        }else{
            loginModal.open();
        }
    }
    return(
        <button
                onClick={() => {
                        alert("Booking successful");
                    }}
                    className="w-full mb-5 py-4 text-xl text-center text-white bg-airbnb rounded-xl hover:bg-airbnb-dark transition-colors font-semibold"
                >
                    Book an Appointment
            </button>
    )
}

export default ReservationButton