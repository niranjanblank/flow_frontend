import { getCardDueToday, getOverdueCards } from "@/app/lib/db_queries/cards"
import Background from "../../../public/assets/bg.png"

import CardsOverDue from "./components/CardsOverDue";
import CardsDueToday from "./components/CardsDueToday";
export default async function Today(){

    const cards_due_today: any[] = await getCardDueToday()
    const overdue_cards: any[] = await getOverdueCards()
    return (
        <div className="flex flex-col p-4 gap-2 items-center w-full h-full"
        style={{
            backgroundImage: `url(${Background.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
        >
            {/* <div className=" bg-green-500 w-2/4">
                <h1 className="">Overdue Tasks</h1>
            </div> */}
          
               
                <CardsDueToday cards={cards_due_today}/>

                <CardsOverDue cards={overdue_cards}/>
           
        </div>
    )
}