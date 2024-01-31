'use client'

export function Navbar({
    children
}: {children: React.ReactNode}){
    return (
        <div className="bg-red-400 w-72">
            Navbar
            {children}
        </div>
    )
}