import { Navbar } from "../components/Navbar/Navbar"

export default function BoardLayout(
{
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex w-full h-screen">
        <Navbar>asd</Navbar>
        <main className="flex-grow">
            {children}
        </main>
        </div>
    )
}