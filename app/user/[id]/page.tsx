import Image from 'next/image'
import ContactButton from '@/app/components/ContactButton'; 
import PropertyList from '@/app/components/properties/PropertyList'; 


 const UserDetailPage = () =>{
    return(
        <main className="max-w-[2000px] mx-auto px-6 mt-6 pb-6">
            <div className=" grid grid-col-1 md:grid-cols-4 gap-4">
                <aside className="col-span-1 mb-4">
                    <div className="flex flex-col items-center p-6 rounded-xl border broder-gray-300 shadow-xl">
                        <Image 
                        src='/profile-2.webp'
                        width={200}
                        height={200}
                        alt="User"
                        className='rounded-full'
                        />

                        <h1 className='mt-6 text-2xl'> User Name</h1>

                        <ContactButton/>

                    </div>
                </aside>

                <div className="col-span-1 lg:col-span-3 pl-o md:pl-6">
                    <div className = "mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <PropertyList/>
                </div>
                </div>
            </div>  

        </main>
    )
 }

 export default UserDetailPage;