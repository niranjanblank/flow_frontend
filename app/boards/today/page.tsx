import { getCardDueToday, getOverdueCards } from "@/app/lib/db_queries/cards"
import Background from "../../../public/assets/bg.png"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CardsOverDue from "./components/CardsOverDue";
import CardsDueToday from "./components/CardsDueToday";
export default async function Today(){

    const cards_due_today: any[] = await getCardDueToday()
    const overdue_cards: any[] = await getOverdueCards()
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
            </TabsList>
            <TabsContent value="today" className="bg-red">
                 <CardsDueToday cards={cards_due_today}/>
            </TabsContent>
            <TabsContent value="overdue"><CardsOverDue cards={overdue_cards}/></TabsContent>
            </Tabs> 
               

        </div>
    )
}