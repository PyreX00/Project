'use client'




import { useState, useEffect } from 'react';

import apiService from '@/app/services/apiService';
import useLoginModal from '@/app/hooks/useLoginModal';



export type Property = {
    id: string;
    rent: number;
    guests: number;
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


    const [rent, setRent] = useState<number>(0);
    const [guests, setGuests] = useState<number>(1);
    const [profession, setProfession] = useState<string>('');
    const [renter, setRenter] = useState<string>('M'); 
    

    const preformbooking= async () => {
        if(userId){
            const formData = new FormData();
            formData.append('guests',guests.toString()); 
            formData.append('profession',profession); 
            formData.append('renter',renter);  

            const response = await apiService.post(`/api/properties/${property.id}/book/`, formData);
            
            if (response.success){
                console.log("Booking finished")
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
                onClick={() => {
                        preformbooking();
                        alert("Booking successful");
                    }}
                    className="w-full mb-5 py-4 text-xl text-center text-white bg-airbnb rounded-xl hover:bg-airbnb-dark transition-colors font-semibold"
                >
                    Book an Appointment
                </button>
            

        </aside>
    )
}

export default ReservationSidebar;