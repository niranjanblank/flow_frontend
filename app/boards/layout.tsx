
import Sidebar from "../components/Navbar/Sidebar"


export default function BoardLayout(
{
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex w-full h-screen">
        <Sidebar/>
        <main className="flex-grow overflow-x-auto">
            {children}
        </main>
        </div>
    )
}