// This components the card that represent board in the board dashboard

import Link from "next/link";


const BoardCard = ({title, id, description}:{title: string, id: number, description: string}) => {
    return (
        <Link href={`/boards/${id}`}>
            <div className="p-2 rounded-md text-gray-300 bg-gray-800 w-56 min-h-28 flex flex-col">
            <h1 className="text-md font-bold">
            {title}
            </h1>
                <h1 className="text-xs mt-2">
                {description}
                </h1>
            </div>
        </Link>
    )
}

export default BoardCard