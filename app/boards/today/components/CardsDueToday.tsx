import { FaRegCheckCircle } from "react-icons/fa";
import CardToday from "./CardToday";
import moment from "moment";
export default function CardsDueToday({cards}:{cards: any[]}){
   
    return (
        <div className="flex flex-col w-2/4 p-4 rounded-md">
            <h1 className="text-3xl font-bold">Today </h1>
            <h2  className="text-sm font-bold">{moment().format('MMMM Do YYYY')}</h2>
            <div>{cards.length>0?(
                <p className="flex gap-2 mt-2 items-center text-gray-500 text-sm" ><FaRegCheckCircle/>{cards.length} tasks left</p>
            ):''}</div>
            <div>
            {cards.length==0?'':(
                <div className='flex flex-col w-full  gap-2'>
                {cards.map(card=> (
                    <CardToday key={`due-today-card-${card.id}`} card={card} />
                ))}</div>
            )}
             </div>
    </div>

    )
}