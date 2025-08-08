'use client'




import { useState, useEffect } from 'react';

import apiService from '@/app/services/apiService';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';



export type Property = {
    id: string;
    rent: number;
    guests: number;
    landlord?: {
        id: string;
        name?: string;
    };
}


interface ReservationSidebarProps {
    userId: string | null,
    property: Property,
    
}

const ReservationSidebar: React.FC<ReservationSidebarProps> = ({
    property,
    userId
}) => {
    const loginModal = useLoginModal();
    const router = useRouter();


    const [rent, setRent] = useState<number>(0);
    const [guests, setGuests] = useState<number>(1);
    const [profession, setProfession] = useState<string>('');
    const [renter, setRenter] = useState<string>('M');
    const [isBooking, setIsBooking] = useState<boolean>(false);
    
        const sendDefaultMessage = async (conversationId: string, userDetails: any) => {
        try {
                        const renterTypeText = renter === 'M' ? 'Male' : renter === 'F' ? 'Female' : 'Family';
                        const message = `Hi! I am interested in your property. Here are my details:
            • Profession: ${profession}
            • Number of people: ${guests}
            • Renter type: ${renterTypeText}
            • Property: Rs. ${property.rent.toLocaleString()}/month

            Please let me know about availability and next steps.`;

                    const messageData = new FormData();
                    messageData.append('body', message);

                    await apiService.post(`/api/chat/${conversationId}/`, messageData);
                    return true;
                } catch (error) {
                    console.error('Error sending default message:', error);
                    return false;
                }
            };

    const startConversation = async (landlordId: string) => {
        try {
            const conversation = await apiService.get(`/api/chat/start/${landlordId}/`);

            if (conversation.conversation_id) {
                router.push(`/inbox/${conversation.conversation_id}`);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error starting conversation:', error);
            return false;
        }
    };

    const preformBooking= async () => {
        setIsBooking(true);

        if(userId){
            const formData = new FormData();
            formData.append('guests',guests.toString()); 
            formData.append('profession',profession); 
            formData.append('renter',renter);  

            const response = await apiService.post(`/api/properties/${property.id}/book/`, formData);
            
            if (response.success){
                console.log("Booking finished")

                if (property.landlord?.id) {
                    const conversationStarted = await startConversation(property.landlord.id);
                    if (!conversationStarted) {
                        alert("Booking completed! However, couldn't start conversation. You can contact the landlord from your inbox.");
                    }
                } else {
                    console.warn("No landlord ID available to start conversation");
                }
            }else{
                console.log("Failed")
            }

        }else{
            loginModal.open()
        }
    };

    return (
        <aside className="mt-6 p-5 col-span-2 rounded-xl border border-gray-300 shadow-xl">
            <h2 className="mb-4 text-3xl font-bold">Rs. {property.rent} per month</h2>

            {/* Number of people */}
            <div className="mb-5 p-3 border border-gray-400 rounded-xl">
                <label className="block font-bold text-base mb-2 text-gray-700">Number of People</label>
                <select 
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full p-2 text-lg border-none outline-none bg-transparent"
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                </select>
            </div>

            
            <div className="mb-5 p-3 border border-gray-400 rounded-xl">
                <label className="block font-bold text-base mb-2 text-gray-700">Profession</label>
                <input
                    type="text"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    placeholder="Enter your profession"
                    className="w-full  text-lg border-none outline-none bg-transparent"
                />
            </div>

            
            <div className="mb-5 p-3 border border-gray-400 rounded-xl">
                <label className="block font-bold text-base mb-2 text-gray-700">Renter Type</label>
                <select 
                    value={renter}
                    onChange={(e) => setRenter(e.target.value)}
                    className="w-full p-2 text-lg border-none outline-none bg-transparent"
                >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="FL">Family</option>
                </select>
            </div>

            
            <button
                onClick={preformBooking}
                disabled={isBooking}
                className={`w-full mb-5 py-4 text-xl text-center text-white rounded-xl font-semibold transition-colors ${
                    isBooking 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-airbnb hover:bg-airbnb-dark'
                }`}
            >
                {isBooking ? 'Processing...' : 'Book an Appointment'}
            </button>
            

        </aside>
    )
}

export default ReservationSidebar;