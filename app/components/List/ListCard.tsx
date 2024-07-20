import { HiDotsHorizontal } from "react-icons/hi"
import { FaPlus } from "react-icons/fa";

export default function ListCard(){
    return (
        <div className="bg-zinc-900 text-gray-300 rounded-xl py-3 px-3 w-64">
            {/* header of the list */}
            <div className="flex justify-between items-center px-2">
                <h1>List 1</h1>
                <div><HiDotsHorizontal/></div>
            </div>
            {/* for listing cards of list */}
            <div className="flex flex-col gap-3 mt-2">
                <div className="bg-zinc-800 py-2 px-2 rounded-lg"> Card 1 </div>
                <button className="hover:bg-zinc-700 gap-2 p-2 text-sm flex rounded-lg">
                    <FaPlus/>
                    <p>Add a card</p>
                </button>
            </div>
        </div>
    )
} 