import Image from 'next/image'
import ProperytDetails from '@/app/components/properties/PropertyDetails';
import ReservationSidebar from '@/app/components/properties/ReservationSidebar';
import LoadImages from '@/app/components/properties/LoadImages';

const PropteryDetailPage = () =>{
    return (
        <main className = 'w-full  px-6'>
             <div className =' max-w-[2000] mx-auto  mt-4 grid grid-cols-1 md:grid-cols-4 flex'>
                  <div className='py-6 pr-6 "h-[32vh] lg:h-[64vh]  col-span-3'>
                    <LoadImages/>
                  </div>
                  <div className=''>
                    <div>
                        <h1 className='mb-4 text-4xl'>Property Name</h1>
                        <ProperytDetails/>
                    </div>
                  </div>
            </div>
                
            <div className ='mt-4 grid grid-cols-1 md:grid-cols-4 gap-5 '>
                  <div className='pr-6 col-span-3'>
                    <div className =" flex items-center space-x-4">
                        <div className="py-6 flex items-center space-x-4">
                        <Image 
                            src="/profile-2.webp"
                            alt="Profile"
                            width={50}
                            height={50}
                            className="rounded-full object-cover"
                        />

                        <div className="flex flex-col">
                            <p className="text-lx"><strong>Pyrex</strong></p>
                            <p className="text-xs text-gray-600">+977-9800000000</p>
                        </div>
                        </div>
                        </div>
                    <div>
                            MAP aksjdfhkasdhfasdkjhfiasdfihasudfhisadf aisdufhasdf isahfkas dfihasdkjfh 
                            sdifhasidfhasdifhasdif asdifhadisufhas difhuaishdfi aushdfiashfias dfkajshf
                            iashdf isufhiausdhfius fhisudfhaisufdh aisufhasjidfhsjdfh
                        </div>
                  </div>

                  <div className=''>
                    <ReservationSidebar/> 
                  </div>
                  
            </div>

            

             
        </main>

    )
}

export default PropteryDetailPage;