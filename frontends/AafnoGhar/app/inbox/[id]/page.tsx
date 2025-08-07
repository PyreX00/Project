import ConversationDetail from "@/app/components/inbox/ConversationDetail";
import { getUserId } from "@/app/lib/actions";
import React, {useEffect,useState} from "react"; 
import { UserType } from "../page";
import apiService from "@/app/services/apiService";
import { getAccessToken } from "@/app/lib/actions";


export type MessageType = {
    id:string;
    name:string;
    body:string;
    conversationId:string;
    sent_to:string;
    created_by: UserType;

}

const ConversationPage = async ({ params }:{ params :{ id:string }}) =>{
    const userId = await getUserId();
    const token = await getAccessToken();

    if ( !userId){
        return (
            <main className=" max-w-[1500px] mx-auto px-6 py-12">
                <p> You need to be authenticated.... </p>
            </main>
        )
    }


    const conversation =  await apiService.get(`/api/chat/${params.id}/`)

    return (
        <main className="max-w-[2000px] mx-auto px-6 pb-6">
            <ConversationDetail
                token ={token}
                userId ={userId}
                conversation = {conversation}
            
            />
        </main>
    )
}

export default ConversationPage;