'use server';

import Image from 'next/image';
import apiService from '../services/apiService';

// Define proper TypeScript interface matching Django models
interface Property {
  id: string;
  title: string;
  description: string;
  rent: number;
  bedroom: number;
  kitchen?: number;
  toilet: number;
  parking: string;
  preferred: string;
  size: string;
  location: string;
  no_of_people?: number;
  image: string;
  image_url?: string;
  landlord: string;
  created_at: string;
}

interface Reservation {
  id: string;
  property: Property;
  guests: number;
  profession: string;
  renter: string;
  created_by: string;
  created_at: string;
}

const MyReservation = async () => {
  try {
    const reservations: Reservation[] = await apiService.get('/api/auth/myreservations');

    return (
      <main className="max-w-[1500px] mx-auto px-6 pb-6">
        <h1 className="my-6 text-2xl">My reservations</h1>

        <div className="space-y-4">
          {reservations.length > 0 ? (
            reservations.map((reservation: Reservation) => (
              <div 
                key={reservation.id} 
                className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl"
              >
                <div className="col-span-1">
                  <div className="relative overflow-hidden aspect-square rounded-xl">
                    <Image 
                      fill
                      src={reservation.property.image_url || reservation.property.image || "/house.jpg"}
                      className="hover:scale-110 object-cover transition h-full w-full"
                      alt={`${reservation.property.title} image`}
                    />
                  </div>
                </div>
                <div className="col-span-1 md:col-span-3">
                  <h2 className="mb-4 text-xl">{reservation.property.title}</h2>
                  <p className="mb-2">
                    <strong>Location:</strong> {reservation.property.location}
                  </p>
                  <p className="mb-2">
                    <strong>Rent:</strong> Rs. {reservation.property.rent}
                  </p>
                  <p className="mb-2">
                    <strong>Guests:</strong> {reservation.guests}
                  </p>
                  <p className="mb-2">
                    <strong>Profession:</strong> {reservation.profession}
                  </p>
                  <p className="mb-2">
                    <strong>Bedrooms:</strong> {reservation.property.bedroom} | <strong>Toilets:</strong> {reservation.property.toilet}
                    {reservation.property.kitchen && (
                      <> | <strong>Kitchen:</strong> {reservation.property.kitchen}</>
                    )}
                  </p>
                  <p className="mb-2 text-sm text-gray-600">
                    <strong>Reserved on:</strong> {new Date(reservation.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No reservations found.</p>
            </div>
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

export default MyReservation;