import Image from 'next/image';
import apiService from '@/app/services/apiService';

const PropertyDetails = async ({params}:{params : { id : string}}) => {
const property = await apiService.get(`/api/properties/${params.id}`)

  // Helper function to convert codes to readable text
  const formatValue = (key: string, value: any) => {
    if (!value) return 'N/A';
    
    switch (key) {
      case 'parking':
        switch (value.toLowerCase()) {
          case 'n': return 'None';
          case 'b': return 'Bike Only';
          case 'c': return 'Car Only';
          case 'both': return 'Both';
          default: return value;
        }
      case 'preferred':
        switch (value.toLowerCase()) {
          case 'm': return 'Male';
          case 'f': return 'Female';
          case 'fl': return 'Family';
          case 'dnm':
          case 'all': return 'No Preference';
          default: return value;
        }
      case 'size':
        switch (value.toLowerCase()) {
          case 'sm': return 'Small';
          case 'md': return 'Medium';
          case 'lg': return 'Large';
          default: return value;
        }
      default:
        return value;
    }
  };

  const features = [
    { label: 'Bedroom', icon: '/icons/bedroom.svg', value: formatValue('bedroom', property.bedroom)},
    { label: 'Kitchen', icon: '/icons/kitchen.svg', value: formatValue('kitchen', property.kitchen) },
    { label: 'Toilet', icon: '/icons/toilet.svg', value: formatValue('toilet', property.toilet) },
    { label: 'Parking', icon: '/icons/parking.svg', value: formatValue('parking', property.parking)},
    { label: 'Size', icon: '/icons/size.svg', value: formatValue('size', property.size) },
    { label: 'Preferred', icon: '/icons/preferred.svg', value: formatValue('preferred', property.preferred) },
    { label: 'No of People', icon: '/icons/people.svg', value: formatValue('no_of_people', property.no_of_people) },
  ];
  

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      {/* Address - Full width, single column */}
      <div className="mb-6">
        <div className="flex items-center bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200">
          <div className="flex items-center gap-3">
            <Image
              src="/icons/location.svg"
              alt="Location"
              width={28}
              height={28}
              className="flex-shrink-0"
            />
            <div>
              <span className="text-base font-semibold text-gray-700 block">Location</span>
              <span className="text-lg font-bold text-gray-900">{property.location || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Other features - Two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <div
            key={`${feature.label}-${index}`}
            className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition-colors border border-gray-200"
          >
            <div className="flex flex-col items-center gap-2">
              <Image
                src={feature.icon}
                alt={feature.label}
                width={28}
                height={28}
                className="flex-shrink-0"
              />
              <span className="text-xs font-medium text-gray-600 text-center">
                {feature.label}
              </span>
            </div>
            <span className="text-lg font-bold text-gray-900">{feature.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyDetails;