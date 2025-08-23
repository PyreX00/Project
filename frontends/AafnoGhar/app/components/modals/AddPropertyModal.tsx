'use client'


import { ChangeEvent, useState } from "react"
import Image from "next/image"
import Modal from './Modal'
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal"
import LoginModal from "./LoginModal"
import CustomButton from "../forms/CustomButton"
import Categories from "../addproperty/Categories"
import apiService from "@/app/services/apiService"
import { useRouter } from "next/navigation"

const AddPropertyModal = () => {

    //states
    const [currentStep, setCurrentStep ] = useState(1);
    const [errors, setErrors] = useState<string []>([]);
    const [dataCategory, setDataCategory] = useState('');
    const [dataTitle, setDataTitle] = useState('');
    const [dataDescription,setDataDescription] = useState('');
    const [dataRent, setDataRent] = useState('');
    const [dataBedroom, setDataBedroom] = useState('');
    const [dataKitchen, setDataKitchen] = useState('');
    const [dataToilet, setDataToilet] = useState('');
    const [dataParking, setDataParking] = useState('NA');
    const [dataPreferred, setDataPreferred] = useState('ALL');
    const [dataSize, setDataSize] = useState('M');
    const [dataLocation, setDataLocation] = useState('');
    const [dataImage, setDataImage]=useState< File | null>(null);
    const [datano_of_people, setDatano_of_people] = useState('')



    const addPropertyModal = useAddPropertyModal();
    const router = useRouter();

    const setCategory = (category: string) =>{
        setDataCategory(category)
    }

    const setImage = (event: ChangeEvent<HTMLInputElement>) =>{
        if (event.target.files && event.target.files.length >0){
            const tmpImage = event.target.files[ 0];

            setDataImage(tmpImage);
        }
    }


    const submitForm = async () => {
        if (
                dataCategory &&
                dataTitle &&
                dataDescription &&
                dataBedroom &&
                dataParking &&
                dataPreferred &&
                dataToilet &&
                dataImage &&
                dataLocation &&
                dataSize &&
                dataRent 
            ) {
                const formData = new FormData();
                formData.append('category', dataCategory.trim());     
                formData.append('title', dataTitle.trim());    
                formData.append('description', dataDescription.trim());
                formData.append('bedroom', dataBedroom.toString());  
                formData.append('parking', dataParking);              
                formData.append('preferred', dataPreferred);           
                formData.append('toilet', dataToilet.toString());     
                formData.append('location', dataLocation.trim());  
                formData.append('size', dataSize);             
                formData.append('rent', dataRent.toString()); 
                formData.append('image', dataImage);


                if (dataKitchen) formData.append('kitchen', dataKitchen);
                if (datano_of_people) formData.append('no_of_people', datano_of_people);
                
                const response = await apiService.post('/api/properties/create/', formData)
                
                if (response.success){
                    console.log("Success")

                    router.push('/')

                    addPropertyModal.close();
    
                }else{
                    console.log('Error')

                    const tmpErrors: string[] = Object.values(response).map((error: any) => {
                        return error;
                    });

                    setErrors(tmpErrors)
                }
            }
                }




    const content = ( 
        <> 
            { currentStep == 1 ? (
            <>
                <h2 className="mb-6 text-2xl"> Choose category </h2>

                <div className="mb-6 w-full overflow-hidden">
                    <Categories
                        dataCategory={dataCategory}
                        setCategory={(category) => setCategory(category)}
                    />
                </div>

                < CustomButton 
                    label = 'Next'
                    onClick={() => setCurrentStep(2)}
                />
            </>
            ): currentStep == 2 ? (
                <>
                    <h2 className="mb-6 text-2xl">Describe your place </h2>  
                    < div className="pt-3 pb-6 space-y-4">
                        <div className=" flex flex-col space-y-2">
                            <label> Title</label>
                            <input
                                type ='text'
                                value={dataTitle}
                                onChange={(e) => setDataTitle(e.target.value)}
                                className="w-full p-4 border border-gray-600 rounded-xl"
                                />
                        </div>
                           <div className=" flex flex-col space-y-2">
                            <label> Description </label>
                            <textarea
    
                                value={dataDescription}
                                onChange={(e) => setDataDescription(e.target.value)}
                                className="w-full h-[200px] p-4 border border-gray-600 rounded-xl"
                                ></textarea>
                        </div> 
                    </div>

            <div className="flex gap-4">
                <CustomButton 
                    label='Previous'
                    onClick={() => setCurrentStep(1)}
                />

                <CustomButton 
                    label='Add Details'
                    onClick={() => setCurrentStep(3)}
                />
            </div>
                </>
                ): currentStep == 3 ? (
  <>
    <h2 className="mb-6 text-2xl">Details</h2>  
    <div className="pt-3 pb-6">
       
        <div className="flex flex-col space-y-2 mb-6">
            <label>Location</label>
            <input
                type='text'
                value={dataLocation}
                onChange={(e) => setDataLocation(e.target.value)}
                className="w-full p-4 border border-gray-600 rounded-xl"
            />
        </div>
        

        <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
                <label>Monthly rent</label>
                <input
                    type='number'
                    value={dataRent}
                    onChange={(e) => setDataRent((e.target.value))}
                    className="w-full p-4 border border-gray-600 rounded-xl"
                />
            </div>
            <div className="flex flex-col space-y-2">
                <label>Bedrooms</label>
                <input
                    type='number'
                    value={dataBedroom}
                    onChange={(e) => setDataBedroom((e.target.value))}
                    className="w-full p-4 border border-gray-600 rounded-xl"
                />
            </div>
            <div className="flex flex-col space-y-2">
                <label>Kitchen</label>
                <input
                    type='number'
                    value={dataKitchen}
                    onChange={(e) => setDataKitchen((e.target.value))}
                    className="w-full p-4 border border-gray-600 rounded-xl"
                />
            </div>
            <div className="flex flex-col space-y-2">
                <label>Toilet</label>
                <input
                    type='number'
                    value={dataToilet}
                    onChange={(e) => setDataToilet((e.target.value))}
                    className="w-full p-4 border border-gray-600 rounded-xl"
                />
            </div>
            <div className="flex flex-col space-y-2">
                <label>Parking</label>
                <select
                    value={dataParking}
                    onChange={(e) => setDataParking(e.target.value)}
                    className="w-full p-4 border border-gray-600 rounded-xl"
                >
                    <option value="">Select parking</option>
                    <option value="N">None</option>
                    <option value="B">Bike Only</option>
                    <option value="C">Car Only</option>
                    <option value="both">both</option>
                </select>
            </div>
            <div className="flex flex-col space-y-2">
                <label>Preferred</label>
                <select
                    value={dataPreferred}
                    onChange={(e) => setDataPreferred(e.target.value)}
                    className="w-full p-4 border border-gray-600 rounded-xl"
                >
                    <option value="">Select preference</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="FL">Family</option>
                    <option value="DNM">All</option>
                </select>
            </div>
            <div className="flex flex-col space-y-2">
                <label>Size</label>
                <select
                    value={dataSize}
                    onChange={(e) => setDataSize(e.target.value)}
                    className="w-full p-4 border border-gray-600 rounded-xl"
                >
                    <option value="">Select size</option>
                    <option value="SM">Small</option>
                    <option value="MD">Medium</option>
                    <option value="LG">Large</option>
                </select>
            </div>
            <div className="flex flex-col space-y-2">
                <label>No of people</label>
                <input
                    type='number'
                    value={datano_of_people}
                    onChange={(e) => setDatano_of_people((e.target.value))}
                    className="w-full p-4 border border-gray-600 rounded-xl"
                />
            </div>
        </div>
    </div>

    <div className="flex gap-4 mt-6">
        <CustomButton 
            label='Previous'
            onClick={() => setCurrentStep(2)}
        />

        <CustomButton 
            label='Next'
            onClick={() => setCurrentStep(4)}
        />
    </div>
    </> 
    )  :  (
                    <>
                        <h2 className=" mb-6 text-2xl"> Add images</h2>
                        <div className="pt-3 pb06 space-y-4">
                            <div className="py-4 px-6 bg-gray-600 text-white rounded-xl">
                                <input 
                                    type='file'
                                    accept='image/*'
                                    onChange={setImage}
                                />
                            </div>
                            {dataImage && (
                                <div className='w-[200px] h-[150px] relative mb-6'>
                                    <Image 
                                        fill
                                        alt="Uploaded image"
                                        src ={URL.createObjectURL(dataImage)}
                                        className="w-full h-full object-cover rounded-xl"
                                        onError={(e) => console.log('Image load error:', e)}
                                    />
                                </div>
                            )}
                        </div>

                            
                            {errors.map((error,index)=>{   
                                <div 
                                    key={index}    
                                    className='p-5 mb-4 bg-aribnb text-white rounded-xl opacity-80'>
                                        {error}
                                </div>

                            })}
                        <div className="flex gap-4 mt-6">
                            <CustomButton 
                                label='Previous'
                                onClick={() => setCurrentStep(3)}
                            />

                            <CustomButton 
                                label='Submit'
                                onClick={submitForm}
                            />
                        </div>
                    </>                    
                )
            }
        </>
    )

    return (
        <>
            <Modal
                isOpen = {addPropertyModal.isOpen}
                close = {addPropertyModal.close}
                label = "Add property"
                content={content}
            />
        </>
    )

}

export default AddPropertyModal;