  import Image from 'next/image'
import ProperytDetails from '@/app/components/properties/PropertyDetails';
import ReservationSidebar from '@/app/components/properties/ReservationSidebar';
import LoadImages from '@/app/components/properties/LoadImages';
import apiService from '@/app/services/apiService';
import { getUserId } from '@/app/lib/actions';
import Link from 'next/link';

const PropteryDetailPage = async ({params}:{params : { id : string}}) =>{

    const property = await apiService.get(`/api/properties/${params.id}`)
    const userId = await getUserId();


    return (
        <main className = 'w-full  px-6'>
             <div className =' max-w-[2000] mx-auto  mt-4 grid grid-cols-1 md:grid-cols-4 flex'>
                  <div className='py-6 pr-6 "h-[32vh] lg:h-[64vh]  col-span-3'>
                    <LoadImages/>
                  </div>
                  <div className=''>
                    <div>
                        <h1 className='mb-4 text-4xl'>{property.title}</h1>
                        <ProperytDetails params={params} /> 
                    </div>
                  </div>
            </div>     
            <div className ='mt-4 grid grid-cols-1 md:grid-cols-4 gap-5 '>
                  <div className='pr-6 col-span-3'>
                    <div className =" flex items-center space-x-4">

                        <Link
                          href={`/user/${property.landlord.id}`}
                          className="py-6 flex items-center space-x-4">
                          {property.landlord.avatar_url || (
                        <Image 
                            src={
                                property.landlord.avatar_url || 
                                (property.landlord.gender === 'M' || property.landlord.gender === 'male' 
                                    ? '/male.jpg' 
                                    : '/female.jpeg')
                            }
                            alt="Profile"
                            width={50}
                            height={50}
                            className="rounded-full object-cover"
                        />
                        )}

                        <div className="flex flex-col">
                            <p className="text-lx"><strong>{property.landlord.name}</strong></p>
                            <p className="text-xs text-gray-600">+977-9800000000</p>
                        </div>
                        </Link>
                        </div>
                    <div>
                            {property.description}
                        </div>
                  </div>

                  <div className=''>
                    <ReservationSidebar

                      property={property}
                      userId={userId}
                    /> 
                  </div>  
            </div>       
        </main>
    )
}
export default PropteryDetailPage;