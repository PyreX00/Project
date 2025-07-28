import Link from 'next/link'
import Image from 'next/image'
import SearchFilter  from './SearchFilters'
import Services from './Services'
import UserNav  from './UserNav'
import AddPropertyButton from './AddPropertyButton'

const Navbar = () => {
    return(
        <nav className = "w-full fixed top-0 left-0 py-6 border-b bg-white z-10">
            <div className="max-w-[2000px] mx-auto px-6  "> 
                < div className=" flex justify-between items-center"> 
                    <Link href = "/">
                     <div className="flex items-center">
                        <Image
                        src="/aafnogharlogo.png"
                        alt="AafnoGhar Logo"
                        width={50}
                        height={30}
                        className="block"
                        />
                        <p className=" hidden md:block text-airbnb ml-2  text-5xl font-semibold ">AafnoGhar</p>
                    </div>
                     </Link>


                    <div className = "flex ">
                        <Services/>
                    
                    </div>

                     <div className='flex '>
                        <SearchFilter/>
                     </div>
                     
                     <div className='flex items-center space-x-6'>
                        <AddPropertyButton/>  
                        <UserNav/>
                     </div>
                </div>
            </div>

        </nav>
    )
}

export default Navbar;  