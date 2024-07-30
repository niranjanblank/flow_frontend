'use client'

import Link from "next/link"
import { useState } from "react"
import { FaAngleRight, FaAngleLeft } from "react-icons/fa"
import { RiLogoutBoxLine } from "react-icons/ri";

export function Navbar({
    children
}: {children: React.ReactNode}){

    // signout function 
    const signout = () => {
        document.cookie = 'access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
        window.location.href = '/login'; // Redirect to the login page or home page
    }

    const [open,setOpen] = useState(true)

    const onCloseHandler = () => {
        setOpen(!open)
    }
    return (
        <div className={`bg-zinc-800 text-gray-200 ${open?'min-w-72':'min-w-8'} flex flex-col transition-all justify-between duration-100 p-2 gap-2`}>
            <div>
               {/* Header */}
               {
                open?( <Link className="flex justify-center p-10 items-center text-white" href="/boards">
                    <h1 className="text-3xl font-bold">SoloPlanner</h1>
                </Link>):(<Link className="flex justify-center py-10 items-center text-white" href="/boards">
                    <h1 className="text-3xl font-bold">S</h1>
                </Link>)
               }
              
            <hr/>
            <div className="flex justify-between pt-2 ">
                {open?(<h1>Username Here</h1>):""}
                <button className="text-lg " onClick={onCloseHandler}>{open?<FaAngleLeft/>:<FaAngleRight/>}</button>
            </div>
            <div className="transition-all right">
                {open?children:""}

                
            </div>
            </div>
            {/* for logout button */}
            <div className="flex gap-2 items-center hover:bg-zinc-700 p-2 rounded-lg"
            onClick={()=>{signout()}}
            >
                    <RiLogoutBoxLine className="text-lg"/>{open?"Logout":""}
            </div>
        </div>
    )
}