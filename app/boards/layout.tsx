
import Link from "next/link"
import Sidebar from "../components/Navbar/Sidebar"
import { ToastContainer } from "react-toastify"


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
                        <h1 className="text-2xl font-bold">SoloPlanner</h1>
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