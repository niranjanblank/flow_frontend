
import Link from "next/link"
import Sidebar from "../components/Navbar/Sidebar"
import { ToastContainer } from "react-toastify"
import flow_logo from "../../public/assets/flow_2.png"
import Image from "next/image"

export default function BoardLayout(
{
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col h-screen">
                    
            <div className="bg-zinc-800 p-2 py-3 text-gray-100 border-b border-gray-500">
            <Link className="" href="/boards">
            <Image 
                        src={flow_logo} 
                        alt="Flow Logo" 
                        className="w-[200px]" 
                        priority 
                    />
                </Link>
            </div>
            <div className="flex w-full flex-grow">
                <Sidebar/>
                <main className="flex-grow overflow-x-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}