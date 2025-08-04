'use server';

import Image from 'next/image';
import apiService from '../services/apiService';


const MyReservationPage = async () =>{

    const reservations = await apiService.get('/api/auth/myreservations/')

    console.log(reservations)

    return (
      
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <h1 className ="my-6 text-2xl"> My reservations</h1>

            <div className="space-y-4">

                { reservations.map((reservation: any) =>{       
                return (
                <div className="p-5 grid grid-col-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">
                    <div className="col-span-1">
                        <div className="relative overflow-hidden aspect-square rounded-xl">
                            <Image 
                                fill
                                src={reservation.property.image_url}
                                className='hover:scale-110 object-cover transition h-full w-full'
                                alt='Beach House'
                                />
                        </div>
                    </div>
                    <div className = "col-span-1 md:col-span-3">
                        <h2 className='mb-4 text-xl'> {reservation.property.title}</h2>
                        <p className = 'mb-2'><strong>Guests</strong> {reservation.property.noofpeople}</p>

                        <div className="mt-6 inline-block cursor-pointer py-4 px-6 bg-airbnb text-white rounded-xl">
                          Go to propery  
                         </div>
                    </div>

                </div>
                )
                } )}
            </div> 
        </main>
    )
}

export default MyReservationPage