import Image from 'next/image'
import ProperytDetails from '@/app/components/properties/PropertyDetails';
import ReservationSidebar from '@/app/components/properties/ReservationSidebar';
import LoadImages from '@/app/components/properties/LoadImages';
import apiService from '@/app/services/apiService';
import { getUserId } from '@/app/lib/actions';
import Link from 'next/link';

// Fix the interface for Next.js 15+
interface PropertyDetailPageProps {
    params: Promise<{ id: string }>;
}

const PropertyDetailPage = async ({ params }: PropertyDetailPageProps) => {
    // Await the params promise
    const { id } = await params;
    
    try {
        // Use the awaited id parameter
        const property = await apiService.get(`/api/properties/${id}`);
        const userId = await getUserId();

        return (
            <main className='w-full px-6'>
                <div className='max-w-[2000px] mx-auto mt-4 grid grid-cols-1 md:grid-cols-4'>
                    <div className='py-6 pr-6 h-[32vh] lg:h-[64vh] col-span-3'>
                        <LoadImages />
                    </div>
                    <div className=''>
                        <div>
                            <h1 className='mb-4 text-4xl'>{property.title}</h1>
                            {/* Pass the awaited params or just the id */}
                            <ProperytDetails propertyId={id} property={property} /> 
                        </div>
                    </div>
                </div>     
                
                <div className='mt-4 grid grid-cols-1 md:grid-cols-4 gap-5'>
                    <div className='pr-6 col-span-3'>
                        <div className="flex items-center space-x-4">
                            <Link
                                href={`/user/${property.landlord.id}`}
                                className="py-6 flex items-center space-x-4"
                            >
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
                                <div className="flex flex-col">
                                    <p className="text-lg"><strong>{property.landlord.name}</strong></p>
                                    <p className="text-xs text-gray-600">+977-9800000000</p>
                                </div>
                            </Link>
                        </div>
                        
                        <div className="mt-4">
                            <p className="text-gray-700 leading-relaxed">
                                {property.description}
                            </p>
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
        );
    } catch (error) {
        console.error('Error loading property:', error);
        return (
            <main className='w-full px-6'>
                <div className='max-w-[2000px] mx-auto mt-4 text-center py-12'>
                    <h1 className='text-2xl font-bold text-red-600 mb-4'>Property Not Found</h1>
                    <p className='text-gray-600'>The property you're looking for doesn't exist or couldn't be loaded.</p>
                    <Link 
                        href="/properties" 
                        className='mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600'
                    >
                        Browse Properties
                    </Link>
                </div>
            </main>
        );
    }
}

export default PropertyDetailPage;