'use server';

import Image from 'next/image';
import apiService from '../services/apiService';

const MyReservationPage = async () => {
    try {
        const response = await apiService.get('/api/auth/myreservations/');
        
        // Debug: Log the full response to understand the structure
        console.log('Full API response:', response);
        console.log('Type of response:', typeof response);
        console.log('Is array:', Array.isArray(response));
        
        // Handle different possible response structures
        let reservations;
        
        if (Array.isArray(response)) {
            // Direct array response
            reservations = response;
        } else if (response && Array.isArray(response.data)) {
            // Response wrapped in data property
            reservations = response.data;
        } else if (response && Array.isArray(response.results)) {
            // Paginated response with results array
            reservations = response.results;
        } else {
            // Fallback to empty array if structure is unexpected
            console.error('Unexpected response structure:', response);
            reservations = [];
        }

        return (
            <main className="max-w-[1500px] mx-auto px-6 pb-6">
                <h1 className="my-6 text-2xl">My reservations</h1>

                <div className="space-y-4">
                    {reservations.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500">No reservations found.</p>
                        </div>
                    ) : (
                        reservations.map((reservation: any) => (
                            <div 
                                key={reservation.id} // Add key prop
                                className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl"
                            >
                                <div className="col-span-1">
                                    <div className="relative overflow-hidden aspect-square rounded-xl">
                                        <Image 
                                            fill
                                            src={reservation.property?.image_url || '/placeholder-image.jpg'}
                                            className="hover:scale-110 object-cover transition h-full w-full"
                                            alt={reservation.property?.title || 'Property image'}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-1 md:col-span-3">
                                    <h2 className="mb-4 text-xl">{reservation.property?.title}</h2>
                                    <p className="mb-2">
                                        <strong>Guests:</strong> {reservation.property?.noofpeople}
                                    </p>
                                    
                                    {/* Add more reservation details */}
                                    {reservation.check_in_date && (
                                        <p className="mb-2">
                                            <strong>Check-in:</strong> {new Date(reservation.check_in_date).toLocaleDateString()}
                                        </p>
                                    )}
                                    {reservation.check_out_date && (
                                        <p className="mb-2">
                                            <strong>Check-out:</strong> {new Date(reservation.check_out_date).toLocaleDateString()}
                                        </p>
                                    )}

                                    <div className="mt-6 inline-block cursor-pointer py-4 px-6 bg-airbnb text-white rounded-xl">
                                        Go to property  
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div> 
            </main>
        );
        
    } catch (error) {
        console.error('Error fetching reservations:', error);
        
        return (
            <main className="max-w-[1500px] mx-auto px-6 pb-6">
                <h1 className="my-6 text-2xl">My reservations</h1>
                <div className="text-center py-8">
                    <p className="text-red-500">Error loading reservations. Please try again later.</p>
                </div>
            </main>
        );
    }
};

export default MyReservationPage;