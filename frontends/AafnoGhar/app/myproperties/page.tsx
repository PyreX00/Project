import Image from 'next/image'
import { getUserId } from '../lib/actions';
import PropertyList from '../components/properties/PropertyList';

export const dynamic = 'force-dynamic';

 const MyProperties = async () =>{

    const userId = await getUserId();

    return(
        <main className="max-w-[2000px] h-[650px] mx-auto px-6 mt-6 pb-6 space-y-4">
            
            <h1 className="mt-6 mb-2 text-3xl pb-4 mb-6">My Properties</h1>


            <div className='grid grid-cols-1 md:grid-cols-5 gap-6'>
                <PropertyList 
                    landlord_id={userId}
                />
            </div>

            </main>
    )
}

export default MyProperties;
