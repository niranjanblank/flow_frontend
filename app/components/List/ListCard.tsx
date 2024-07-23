import { HiDotsHorizontal } from "react-icons/hi"
import { FaPlus } from "react-icons/fa";
import CreateCard from "../Forms/CreateCard";
import AddCard from "./AddCard";
import ListSetting from "./ListSetting";

// get the carrds of currrent list
async function getCardsinList(list_id:number){
    const response = await fetch(`http://localhost:8000/list_card/list/${list_id}`, { cache: 'no-store' });
    const data = await response.json();
    return data
  }

export default async function ListCard({board_list}:{board_list:{id: number, title: string, board_id:number}}){
    const card_data = await getCardsinList(board_list.id)
    return (
        <div className="bg-zinc-900 text-gray-300 rounded-xl py-3 px-3 min-w-64 h-fit">
            {/* header of the list */}
            <div className="flex justify-between items-center px-2">
                <h1>{board_list.title}</h1>
                <ListSetting list_id={board_list.id}/>
            </div>
            {/* for listing cards of list */}
            <div className="flex flex-col gap-3 mt-2">
                {card_data.map(card => {
                    return (
                        <div key={`card-${card.id}-list${board_list.id}`} className="bg-zinc-800 py-2 px-2 rounded-lg"> {card.title} </div>
                    )
                })}
                <AddCard list_id={board_list.id}/>
            </div>
           
        </div>
    )
} 