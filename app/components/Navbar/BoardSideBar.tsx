"use client"
import Link from "next/link"
import { useEffect, useState } from "react"


export default function BoardSideBar({board_data}:{board_data: any}){
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
            setBoardItems(board_data.length>4? board_data.slice(0,3):board_data)
        }
        console.log(showMorePressed,boardItems)
    },[showMorePressed])

    return (
        <ul className="text-xs ml-1 flex flex-col gap-1">
        {boardItems.map((board: any) => {
          return (
          <li key={`board-${board.id}`}><Link href={`/boards/${board.id}`}>{board.title}</Link></li>)
        })}
        <div onClick={onshowMorePressedHandler} className="flex justify-between">
            <h1>{showMorePressed?"Show Less":"Show More"}</h1>
            {showMorePressed?"":(<span className="bg-slate-300 w-8 rounded-lg flex justify-center text-black">{board_data.length-boardItems.length}</span>)}
            </div>
      </ul>
    )
}