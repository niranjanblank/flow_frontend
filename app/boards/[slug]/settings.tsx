"use client"

import Popover from "@/app/components/Dialogs/Popover";
import { deleteBoard } from "@/app/lib/db_queries";
import { useRouter } from "next/navigation";
import { MdDeleteOutline } from "react-icons/md";
import { UpdateBackGround } from "./components/update-background";
import { useState } from "react";
import { Board } from "../interfaces";
import { toast } from "react-toastify";
import Drawer from "@/app/components/Dialogs/Drawer";



const Settings = ({board, template_images}:{board: Board, template_images: string[]}) => {
    const router = useRouter()

    

    // delete the board
    const onDeleteHandler = async (id:number) => {
        const deleted_data = await deleteBoard(id)

        if(deleted_data.deleted){
            toast.info("Board deleted")
            router.push("/boards")
            router.refresh()
        }
    }


   
    return (
        <div className="flex flex-col  items-start">
        
            {/* Delete Option */}
            <div className="flex items-center gap-3 hover:bg-gray-500 hover:bg-opacity-10 w-full rounded-lg p-2">
                <MdDeleteOutline className="text-xl"/>
            <button onClick={()=>{onDeleteHandler(board.id)}}> Delete Board</button>
            </div>

            <div className="w-full">
            <Drawer 
            title="Change Background"
            drawerComponent={
                (<div className="flex items-center gap-3 w-72 hover:bg-gray-500 hover:bg-opacity-10 bg-red rounded-lg p-2">
                    <img src={board.background_image_url} className="w-[24px] h-[20px] object-cover rounded-sm"/>
                Change Background
            </div>)}>
                <UpdateBackGround template_images={template_images} board={board}/>
            </Drawer>
            </div>
        </div>
    )
}

export default Settings