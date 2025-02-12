import { getCardDueToday, getCompletedCards, getOverdueCards, getUpcomingCards } from "@/app/lib/db_queries/cards"
import Background from "../../../public/assets/bg.png"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CardsOverDue from "./components/CardsOverDue";
import CardsDueToday from "./components/CardsDueToday";
import CardsUpcoming from "./components/Upcoming";
import { Card } from "../interfaces";
export default async function Today(){

    const cards_due_today: Card[] = await getCardDueToday()
    const overdue_cards: Card[] = await getOverdueCards()
    const upcoming_cards: Card[] = await getUpcomingCards()
    const completed_cards: Card[] = await getCompletedCards()
    console.log('completed',completed_cards)
    return (
        <div className="flex flex-col p-4 gap-2 items-center w-full h-full"
     
        >
            {/* <div className=" bg-green-500 w-2/4">
                <h1 className="">Overdue Tasks</h1>
            </div> */}

         <Tabs defaultValue="today" className="w-full">
            <TabsList>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="overdue">Overdue</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="today" className="bg-red">
                 <CardsDueToday cards={cards_due_today}/>
            </TabsContent>
            <TabsContent value="overdue">
                <CardsOverDue cards={overdue_cards}/>
            </TabsContent>
            <TabsContent value="upcoming">
                <CardsUpcoming cards={upcoming_cards}/>
            </TabsContent>
            <TabsContent value="completed">
                <CardsUpcoming cards={completed_cards}/>
            </TabsContent>
            </Tabs> 
               

        </div>
    )
}