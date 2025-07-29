 import Image from 'next/image' 
 import { PropertyType } from './PropertyList';

 interface PropertyProps{
    property:PropertyType
 }


 const PropertyListItem: React.FC<PropertyProps >= ({
    property

}) =>{
    return(

<div className="cursor-pointer">
  <div className="relative overflow-hidden aspect-square rounded-xl">
    <Image
      src={property.image_url}
      alt="Loading"
      fill
      sizes="(max-width: 768px) 768px, (max-width: 1200px) 768px, 768px"
      className="hover:scale-110 object-cover transition-transform duration-300"
    />
  </div>

  <div className = "mt-2">
    <p className='text-lg font-bold'>{property.title}</p>
  </div>

  <div className = "mt-2">
    <p className='text-sm text-gray-500 '><strong>Rs {property.rent} </strong></p>
  </div>
</div>

    )
}

export default PropertyListItem