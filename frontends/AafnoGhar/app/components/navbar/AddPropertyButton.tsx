'use client'

import useLoginModal from "@/app/hooks/useLoginModal"
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal"


interface AddPropertyButtonProps {
    userId?: string | null;

}



const AddPropertyButton: React.FC<AddPropertyButtonProps> = (
    {
        userId
    }
) =>{
    const loginModal = useLoginModal();
    const addPropertyModal = useAddPropertyModal();

    const addspace = () => {
        if ( userId ){
            addPropertyModal.open()
        }else{
            loginModal.open();
        }
        
    }

    return(
        <div onClick={addspace}
            className="p-2 text-sm font-semibold rounded-full hover:bg-gray-200"
        >
            Add Room
        </div>  
    )


}

export default AddPropertyButton