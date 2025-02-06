"use client"
// add another list button inside the board
// this renders the button first, and if the button is clicked form is rendered in place of the button

import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import CreateList from "../Forms/CreateList";

export default function AddAnotherList({board_id}:{board_id:number}){
    const [formActivate,setFormActivate] = useState(false)
    
    const onClickHandler=()=>{
        setFormActivate(!formActivate)
    }

    return (
        <>

        {formActivate?(
            // render the create list form if formActivate is true
            <CreateList board_id={board_id} setFormActivate = {setFormActivate} />
        ):( <div>
            
                <button 
                onClick={()=>{onClickHandler()}}
                className="hover:bg-zinc-700 hover:bg-opacity-30 flex items-center font-bold text-gray-300 bg-zinc-600 bg-opacity-30 gap-2 p-3 text-sm rounded-lg min-w-64 h-fit">
                    <FaPlus/>
                    <p>Add another list</p>
                </button>
                </div>
            )}
       
    </>
    )
}