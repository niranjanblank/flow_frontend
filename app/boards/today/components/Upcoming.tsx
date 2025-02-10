import { FaRegCheckCircle } from "react-icons/fa";
import CardToday from "./CardToday";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function CardsUpcoming({cards}:{cards: any[]}){
    return (
        <div className="flex flex-col py-4 rounded-md">
             {cards.length>0?(
            <Table className="rounded-md ">
                <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Card Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Board</TableHead>
                    <TableHead>Label</TableHead>
                    <TableHead className="text-right">Due Date</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {cards.map(card=> (
                    <CardToday key={`due-today-card-${card.id}`} card={card} />
                ))}
   
                </TableBody>
            </Table>):(
                <div className="w-full  h-96 text-center flex-col text-gray-600 flex items-center justify-center ">
                <p className="block text-3xl font-mono">Yippie!!!</p>
                <p className="block font-mono">No tasks coming your way</p>
                </div>)}
         {/* <div>{cards.length>0?(
                <p className="flex gap-2 mt-2 items-center text-gray-500 text-sm " ><FaRegCheckCircle/>{cards.length} tasks overdue</p>
            ):''}</div>
        {cards.length==0?'':(
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-2'>
            {cards.map(card=> (
                <CardToday key={`due-today-card-${card.id}`} card={card} />
            ))}</div>
        )} */}
    </div>

    )
}