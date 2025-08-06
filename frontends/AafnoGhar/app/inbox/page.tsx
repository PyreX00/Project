

import apiService from "../services/apiService";
import Conversation from "../components/inbox/Conversation";  
import React,{useState,useEffect } from 'react'
import { getUserId } from "../lib/actions";

export type UserType = {
    id:string;
    name:string;
    avatar_url:string;
}

export type ConversationType = {
    id:string;
    users:UserType[];
}

 const InboxPage = async () =>{

        const userId =  await getUserId ();

    if ( !userId){
        return (
            <main className=" max-w-[1500px] mx-auto px-6 py-12">
                <p> You need to be authenticated.... </p>
            </main>
        )
    }

    const conversations = await apiService.get('/api/chat/')

    return(
        <main className="max-w-[2000px] mx-auto px-6 mt-6 pb-6">
            
            <h1 className='mt-6 mb-2 text-2xl'>Inbox</h1>

            {conversations.map((conversation: ConversationType ) => {
                return (
                        <Conversation 
                            key={conversation.id}
                            conversation={conversation}  
                            userId={userId}   
                        />
                )
            })}

            </main>
    )
}

export default InboxPage;