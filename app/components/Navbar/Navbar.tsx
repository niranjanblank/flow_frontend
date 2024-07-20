'use client'

import { useState } from "react"
import { FaAngleRight, FaAngleLeft } from "react-icons/fa"
export function Navbar({
    children
}: {children: React.ReactNode}){

    const [open,setOpen] = useState(true)

    const onCloseHandler = () => {
        setOpen(!open)
    }
    return (
        <div className={`bg-zinc-800 text-gray-200 ${open?'min-w-72':'min-w-8'} flex flex-col transition-all duration-100 p-2 gap-2`}>
            <div className="flex justify-between ">
                {open?(<h1>Username Here</h1>):""}
                <button className="text-lg" onClick={onCloseHandler}>{open?<FaAngleLeft/>:<FaAngleRight/>}</button>
            </div>
            <div className="transition-all righ">
                {open?children:""}
            </div>
        </div>
    )
}