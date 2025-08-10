import Image from 'next/image'

export const dynamic = 'force-dynamic';

 const AppointmentPage = () =>{
    return(
        <main className="max-w-[2000px] mx-auto px-6 mt-6 pb-6">
            
            <h1 className='mt-6 mb-2 text-2xl'>My Appointments</h1>
                <div className='space-y-4'>
                    <div className ="p-5 mt-4 grid grid-col-1 md:grid-cols-6 gap-4 shadow-md border-gray-300 rounded-xl">
                        <div className='col-span-1'>
                            <div className='relative overflow-hidden aspect-sqaure rounded-xl'>
                               <Image
                               src='/room-1.jpg'
                               alt="loading"
                               width={200}
                               height={300}
                               className='hover:scale-110'
                               />
                            </div>
                        </div>

                        <div className='p-2 col-span-2 space-y-2'>
                            <h2 className='  mb-4 text-xl'>Property Name</h2>
                            <p><strong> Date : </strong> 2082/02/2 </p>
                            <p><strong> Time : </strong> 4PM   </p>

                        <div className='cursor-pointer inline-block py-3 px-6 bg-airbnb text-white rounded-xl hover:bg-airbnb-dark transition'>
                            Go to Property
                        </div>

                        </div>
                    </div>
                    
                    <div className ="p-5 mt-4 grid grid-col-1 md:grid-cols-6 gap-4 shadow-md border-gray-300 rounded-xl">
                        <div className='col-span-1'>
                            <div className='relative overflow-hidden aspect-sqaure rounded-xl'>
                               <Image
                               src='/room-1.jpg'
                               alt="loading"
                               width={200}
                               height={300}
                               className='hover:scale-110'
                               />
                            </div>
                        </div>

                        <div className='p-2 col-span-2 space-y-2'>
                            <h2 className='  mb-4 text-xl'>Property Name</h2>
                            <p ><strong> Date : </strong> 2082/02/2 </p>
                            <p ><strong> Time : </strong> 4PM   </p>
                            <div className='cursor-pointer inline-block py-3 px-6 bg-airbnb text-white rounded-xl hover:bg-airbnb-dark transition'>
                            Go to Property
                        </div>
                        </div>

                         
                    </div>
                    
                </div>

        </main>   
    )
}

export default AppointmentPage; 