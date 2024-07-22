"use client"

import { FaPlus } from "react-icons/fa"
import CreateCard from "../Forms/CreateCard"
import { useState } from "react"

export default function AddCard({list_id}:{list_id: number}){
    const [isFormActive, setIsFormActive] = useState(false)



    return (
        <>
        {
            isFormActive? (<CreateCard list_id={list_id} setIsFormActive={setIsFormActive}/>) :
            (<button className="hover:bg-zinc-700 gap-2 p-2 text-sm flex rounded-lg" onClick={()=>{setIsFormActive(true)}}>
                <FaPlus/>
                <p>Add a card</p>
            </button>)
        }      
        </>
    )

}