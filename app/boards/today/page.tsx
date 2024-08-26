import { getCardDueToday, getOverdueCards } from "@/app/lib/db_queries/cards"
import CardToday from "./components/CardToday"
import { FaRegCheckCircle } from "react-icons/fa";

import CardsOverDue from "./components/CardsOverDue";
import CardsDueToday from "./components/CardsDueToday";
export default async function Today(){

    const cards_due_today: any[] = await getCardDueToday()
    const overdue_cards: any[] = await getOverdueCards()
    return (
        <div className="flex flex-col p-4 gap-2 items-center w-full h-full">
            {/* <div className=" bg-green-500 w-2/4">
                <h1 className="">Overdue Tasks</h1>
            </div> */}
          
               
                <CardsDueToday cards={cards_due_today}/>

                <CardsOverDue cards={overdue_cards}/>
           
        </div>
    )
}