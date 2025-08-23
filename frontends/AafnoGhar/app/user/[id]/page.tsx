import Image from 'next/image'
import ContactButton from '@/app/components/ContactButton'; 
import PropertyList from '@/app/components/properties/PropertyList'; 
import apiService from '@/app/services/apiService';
import { getUserId } from '@/app/lib/actions';

// Fix the interface for Next.js 15+
interface UserDetailPageProps {
    params: Promise<{ id: string }>;
}

const UserDetailPage = async ({ params }: UserDetailPageProps) => {
    // Await the params promise
    const { id } = await params;
    
    try {
        // Use the awaited id parameter
        const landlord = await apiService.get(`/api/auth/${id}`);
        const userId = await getUserId();

        return (
            <main className="max-w-[2000px] mx-auto px-6 mt-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <aside className="col-span-1 mb-4">
                        <div className="flex flex-col items-center p-6 rounded-xl border border-gray-300 shadow-xl">
                            <Image 
                                src={
                                    landlord.avatar_url || 
                                    (landlord.gender === 'M' || landlord.gender === 'male' 
                                        ? '/male.jpg' 
                                        : '/female.jpeg')
                                }
                                width={200}
                                height={200}
                                alt="User"
                                className='rounded-full object-cover'
                            />

                            <h1 className='mt-6 text-2xl font-semibold text-center'>{landlord.name}</h1>
                            
                            {/* Only show contact button if viewing someone else's profile */}
                            {userId !== id && (
                                <div className="mt-4 w-full">
                                    <ContactButton 
                                        landlordId={id}
                                        landlordName={landlord.name}
                                    />
                                </div>
                            )} 
                        </div>
                    </aside>

                    <div className="col-span-1 lg:col-span-3 pl-0 md:pl-6">
                        <div className="mt-4">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                                {userId === id ? 'My Properties' : `${landlord.name}'s Properties`}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <PropertyList landlord_id={id} />
                            </div>
                        </div>
                    </div>
                </div>  
            </main>
        )
    } catch (error) {
        console.error('Error loading user details:', error);
        return (
            <main className="max-w-[2000px] mx-auto px-6 mt-6 pb-6">
                <div className="text-center py-12">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">User Not Found</h1>
                    <p className="text-gray-600">The user profile you're looking for doesn't exist or couldn't be loaded.</p>
                </div>
            </main>
        );
    }
}

export default UserDetailPage;