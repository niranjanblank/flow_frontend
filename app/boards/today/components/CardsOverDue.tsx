import { FaRegCheckCircle } from "react-icons/fa";
import CardToday from "./CardToday";

export default function CardsOverDue({cards}:{cards: any[]}){
   
    return (
        <div className="flex flex-col py-4 w-full rounded-md">
         <div>{cards.length>0?(
                <p className="flex gap-2 mt-2 items-center text-gray-500 text-sm " ><FaRegCheckCircle/>{cards.length} tasks overdue</p>
            ):''}</div>
        {cards.length==0?'':(
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-2'>
            {cards.map(card=> (
                <CardToday key={`due-today-card-${card.id}`} card={card} />
            ))}</div>
        )}
    </div>

    )
}