"use client"

import { deleteBoard } from "@/app/lib/db_queries";
import { useRouter } from "next/navigation";
import { MdDeleteOutline } from "react-icons/md";



const Settings = ({id}:{id: number}) => {
    const router = useRouter()

    // delete the board
    const onDeleteHandler = async (id:number) => {
        const deleted_data = await deleteBoard(id)

        if(deleted_data.deleted){
            router.push("/boards")
            router.refresh()
        }
    }

    return (
        <div className="flex flex-col  items-start">
            {/* Delete Option */}
            <div className="flex items-center gap-3 hover:bg-gray-500 hover:bg-opacity-10 w-full rounded-lg p-2">
                <MdDeleteOutline className="text-xl"/>
            <button onClick={()=>{onDeleteHandler(id)}}> Delete Board</button>
            </div>
        </div>
    )
}

export default Settings