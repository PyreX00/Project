import Image from 'next/image';
import apiService from '@/app/services/apiService';

const PropertyDetails = async ({params}:{params : { id : string}}) => {
const property = await apiService.get(`/api/properties/${params.id}`)

  const features = [
    { label: 'Bedroom', icon: '/icons/bedroom.svg', value: 1},
    { label: 'Kitchen', icon: '/icons/bedroom.svg', value: 1 },
    { label: 'Toilet', icon: '/icons/bedroom.svg', value: 2 },
    { label: 'Parking', icon: '/icons/bedroom.svg', value: 'no'},
    { label: 'Size', icon: '/icons/bedroom.svg', value: 4 },
    { label: 'Highway', icon: '/icons/bedroom.svg', value: 2 },
    { label: 'preffered', icon: '/icons/bedroom.svg', value: 4 },
    { label: 'gender', icon: '/icons/bedroom.svg', value: 2 },
    { label: 'family', icon: '/icons/bedroom.svg', value: 4 },

  ];
  

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 max-w-4xl mx-auto mt-10 px-4">
      {features.map((feature, index) => (
        <div
          key={feature.label}
          className={`flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm hover:bg-gray-200 transition
            ${index % 2 === 0 ? 'sm:border-r sm:border-gray-300' : ''}
          `}
        >
          <div className="flex flex-col items-center gap-2">
            <Image
              src={feature.icon}
              alt={feature.label}
              width={25}
              height={25}
              className="flex-shrink-0"
            />
            <span className="text-base text-xs text-center">
              {feature.label}
            </span>
          </div>
          <span className="text-xl font-bold">{feature.value}</span>
        </div>
      ))}
    </div>
  );
};

export default PropertyDetails;
