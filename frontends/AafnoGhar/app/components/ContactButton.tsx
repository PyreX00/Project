'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ContactButtonProps {
    landlordId?: string;
    landlordName?: string;
}

const ContactButton = ({ landlordId, landlordName }: ContactButtonProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleContact = async () => {
        if (!landlordId) {
            console.log('No landlord ID provided');
            return;
        }
        
        setIsLoading(true);
        try {
           
            router.push(`/inbox/create/${landlordId}`);
            
            
        } catch (error) {
            console.error('Error initiating contact:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleContact}
            disabled={isLoading}
            className="mt-6 py-4 px-6 w-full cursor-pointer bg-airbnb text-white rounded-xl hover:bg-airbnb-dark transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-center"
        >
            {isLoading ? 'Connecting...' : 'Contact'}
        </button>
    );
};

export default ContactButton;