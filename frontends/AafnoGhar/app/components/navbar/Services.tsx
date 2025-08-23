import Link from 'next/link'
import Image from 'next/image'

const Services = () => {
    return(

<div className="hidden lg:flex max-w-screen-lg mx-auto invisible lg:visible">
  <div className="flex-1 lg:flex flex-col items-center justify-center pr-2 md:pr-5 lg:pr-10 transition-transform duration-300 hover:scale-110">
    <Link href="/">
      <Image src="/icons/home.svg" alt="Home" width={40} height={30} />
    </Link>
    <span className="mt-2 text-sm font-semibold sm:text-sm md:text-base lg:text-lg">Home</span>
  </div>

  <div className="flex-1 flex flex-col items-center justify-center pr-2 md:pr-5 lg:pr-10 transition-transform duration-300 hover:scale-110">
    <Link href="/">
      <Image src="/icons/commercial.svg" alt="Commercial" width={40} height={30} />
    </Link>
    <span className="mt-2 text-sm font-semibold sm:text-sm md:text-base lg:text-lg">Commercial</span>
  </div>

  <div className="flex-1 flex flex-col items-center justify-center pr-2 md:pr-5 lg:pr-10 transition-transform duration-300 hover:scale-110">
    <Link href="/">
      <Image src="/icons/services.svg" alt="Services" width={40} height={30} />
    </Link>
    <span className="mt-2 text-sm font-semibold   sm:text-sm md:text-base lg:text-lg">Services</span>
  </div>
</div>


    )
}

export default Services;