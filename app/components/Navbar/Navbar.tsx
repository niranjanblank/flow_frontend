'use client'

import Link from "next/link"
import { useState } from "react"
import { FaAngleRight, FaAngleLeft } from "react-icons/fa"
import { RiLogoutBoxLine } from "react-icons/ri";

export function Navbar({
    children
}: {children: React.ReactNode}){

    const signout = () => {
        document.cookie = 'access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
        window.location.href = '/login';
    }

    const [open, setOpen] = useState(true)

    const onCloseHandler = () => {
        setOpen(prevOpen => !prevOpen)
    }

    return (
        <div className={`bg-zinc-800 text-gray-200 ${open ? 'min-w-72' : 'min-w-12'} flex flex-col transition-width duration-60 justify-between p-2 gap-2`}>
            <div>
                <div className={`flex  ${open ? "justify-between": "justify-center"} items-center py-2 `}>
                    {open && 
                        (
                        <div className="flex gap-2">
                            {/* icon */}
                            <div className="bg-red-300 rounded-lg p-2">
                                NS
                            </div>
                            <div className="text-sm">
                                <h1 className="font-bold">Full Name</h1>
                                <h1 className="text-xs text-gray-400">@username</h1>
                            </div>
                        </div>)
                    }
                    <button className="text-lg" onClick={onCloseHandler}>
                        {open ? <FaAngleLeft /> : <FaAngleRight />}
                    </button>
                </div>
                <hr className="border-gray-300" />
                {open && (

                        <Link  href="/boards">
                        <h1 className="font-semibold text-sm pt-2">Boards</h1>
                        </Link>
                )}
                {open && <div >{children}</div>}
            </div>
            <div className="flex gap-2 items-center hover:bg-zinc-700 p-2 rounded-lg cursor-pointer"
                onClick={signout}>
                <RiLogoutBoxLine className="text-lg" />
                {open && "Logout"}
            </div>
        </div>
    )
}
