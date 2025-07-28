'use client'

import Modal from "./Modal";
import { useState } from 'react'
import useLoginModal from "@/app/hooks/useLoginModal";
import CustomButton from "../forms/CustomButton";


const LoginModal = () =>{ 

    const loginModal = useLoginModal()

    const content = (
        <>
        <h2 className="mb-6 text-2xl"> Welcome to AafnoGhar, please login</h2>
        <form className="space-y-4"> 
            <input type ="Email" placeholder="Email" className="w-full h-[54px] px-4 border bordery-gray-300 rounded-xl"/>

            <input type ="Password" placeholder="password" className="w-full h-[54px] px-4 border bordery-gray-300 rounded-xl"/>
            
            <div className="p-5 bg-airbnb text-white rounded-xl opacity-80">
                this is error message
            </div>

            <CustomButton 
            label={"Submit"}
            onClick={()=>console.log("Clicked submit")}

            />
        </form>

        </>
    )

    return(
        <Modal 
            isOpen = {loginModal.isOpen}
            close={loginModal.close}
            label="Log in"
            content = {content} 
            />

    )
}

export default LoginModal;