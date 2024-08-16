import { Board } from "@/app/boards/interfaces";
import Link from "next/link";

const BoardCard = ({ board }: { board: Board }) => {
    return (
        <Link href={`/boards/${board.id}`}>
            <div 
                className="relative p-2 rounded-md text-gray-300 w-56 min-h-28 flex flex-col"
                style={{
                    backgroundImage: board.background_image_url
                        ? `url(${board.background_image_url})`
                        : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: board.background_image_url ? 'transparent' : '#1f2937', 
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-50 rounded-md pointer-events-none"></div>
                
                {/* Text Content */}
                <div className="relative z-5">
                    <h1 className="text-md font-bold">
                        {board.title}
                    </h1>
                    <h1 className="text-xs mt-2">
                        {board.description}
                    </h1>
                </div>
            </div>
        </Link>
    );
}

export default BoardCard;
