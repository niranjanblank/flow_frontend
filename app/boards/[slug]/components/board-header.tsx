"use client"

import { useState } from "react"
import { Board } from "../../interfaces"
import { updateBoardTitle } from "@/app/lib/db_queries/boards"
import { useRouter } from "next/navigation"

export function BoardHeader({board}:{board: Board}){
    const [title, setTitle] = useState<string>(board.title)
    const router = useRouter()
    // to change the mode of headerr
    const [isEditing, setIsEditing] = useState<boolean>(false)

    // function to handle when the title is our of focus
    const handleBlur = async () => {
        setIsEditing(false)

        // check the length of title, it its greater than 0, then only we update the title
        if (title.length > 0 ){
            const response = await updateBoardTitle({title: title, board: board})
            if (response.success){
                router.refresh()
            }
        }
        else{
            setTitle(board.title)
        }
    }

    // handle form submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleBlur
       
    }

    const handleDoubleClick = () => {
        setIsEditing(true);
    };



    return (
        <div onDoubleClick={handleDoubleClick}>
            {isEditing ? (
                <form onSubmit={handleSubmit} className="w-full ">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={handleBlur}
                        autoFocus
                        className="text-xl w-full text-gray-200  bg-transparent outline-none focus:outline focus:outline-2 focus:outline-blue-500 px-2 rounded-md "
                    />
                </form>
            ) : (
                <h1 className="text-xl px-2 text-gray-200">{title}</h1>
            )}
        </div>
    )
}