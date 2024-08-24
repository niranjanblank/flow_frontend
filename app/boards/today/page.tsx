import { getCardDueToday } from "@/app/lib/db_queries/cards"
import CardToday from "./components/CardToday"
import { FaRegCheckCircle } from "react-icons/fa";
import moment from "moment";
export default async function Today(){

    const cards_due_today: any[] = await getCardDueToday()
    return (
        <div className="w-full flex items-center p-4 flex-col  h-full">
            {/* <div className=" bg-green-500 w-2/4">
                <h1 className="">Overdue Tasks</h1>
            </div> */}
            <div className="w-2/4">
                <h1 className="text-3xl font-bold">Today </h1>
                <h2  className="text-sm font-bold">{moment().format('MMMM Do YYYY')}</h2>
                <div>{cards_due_today.length>0?(
                    <p className="flex gap-2 mt-2 items-center text-gray-500 text-sm px-2" ><FaRegCheckCircle/>{cards_due_today.length} tasks left</p>
                ):''}</div>
                <div>
                    {cards_due_today.length==0?'':(
                        <div className='flex flex-col gap-2'>
                        {cards_due_today.map(card=> (
                            <CardToday key={`due-today-card-${card.id}`} card={card} />
                        ))}</div>
                    )}
                </div>
            </div>
        </div>
    )
}