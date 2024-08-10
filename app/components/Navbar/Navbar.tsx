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
                {open ? (
                    <Link className="flex justify-center p-10 items-center text-white" href="/boards">
                        <h1 className="text-3xl font-bold">SoloPlanner</h1>
                    </Link>
                ) : (
                    <Link className="flex justify-center py-10 items-center text-white" href="/boards">
                        <h1 className="text-3xl font-bold">S</h1>
                    </Link>
                )}
                <hr />
                <div className={`flex  ${open ? "justify-between": "justify-center"} items-center pt-2`}>
                    {open && <h1>Username Here</h1>}
                    <button className="text-lg" onClick={onCloseHandler}>
                        {open ? <FaAngleLeft /> : <FaAngleRight />}
                    </button>
                </div>
                {open && <div className="mt-2">{children}</div>}
            </div>
            <div className="flex gap-2 items-center hover:bg-zinc-700 p-2 rounded-lg cursor-pointer"
                onClick={signout}>
                <RiLogoutBoxLine className="text-lg" />
                {open && "Logout"}
            </div>
        </div>
    )
}
