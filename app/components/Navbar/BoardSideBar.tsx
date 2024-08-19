"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"; 

export default function BoardSideBar({board_data}:{board_data: any}){

    const pathname = usePathname(); // Get the current path

    // Function to check if the route is active
    const isActive = (path: string) => pathname === path;
    // stores items based on the show more button pressed state
    const [boardItems, setBoardItems] = useState([])

    const [showMorePressed, setshowMorePressed] = useState(false)

    const onshowMorePressedHandler = () => {
        setshowMorePressed(!showMorePressed)
    }

    useEffect(()=>{
        if (showMorePressed){
            setBoardItems(board_data)
        }
        else {
            setBoardItems(board_data.length>=4? board_data.slice(0,3):board_data)
        }
        console.log(showMorePressed,boardItems)
    },[showMorePressed, board_data])

    return (
        <ul className="text-xs ml-1 flex flex-col">
        {boardItems.map((board: any) => {
          return (
          <li key={`board-${board.id}`}>
            <Link href={`/boards/${board.id}`} 
            className={`flex p-1 items-center gap-2 ${isActive(`/boards/${board.id}`) ? 'bg-gray-700 rounded-md' : ''}`}>
            <img src={board.background_image_url} className="w-[24px] h-[20px] object-cover rounded-sm"/>
            {board.title}
            </Link></li>)
        })}
        {board_data.length>=4 && (
        <div onClick={onshowMorePressedHandler} className="flex justify-between">
            <h1>{showMorePressed?"Show Less":"Show More"}</h1>
            {showMorePressed ?"":
            (<span className="bg-slate-300 w-8 rounded-lg flex justify-center text-black">{board_data.length-boardItems.length}</span>)}
        </div>
        )}
      
      </ul>
    )
}