// Renders the details of the individual board page based on slug

import Drawer from "@/app/components/Dialogs/Drawer";
import { HiDotsHorizontal } from "react-icons/hi";
import Settings from "./settings";
import ListCard from "@/app/components/List/ListCard";
import AddAnotherList from "@/app/components/List/AddAnotherListCard";
import CreateList from "@/app/components/Forms/CreateList";
import { getBoardData, getBoardLists } from "@/app/lib/db_queries";


export default async function BoardDetails(
    {params}: {
        params: {
            slug: number
        }
    }
)
{
    
    const board_data = await getBoardData(params.slug)
    const board_lists = await getBoardLists(params.slug)
    console.log(board_lists)
   // need to implement logic when data is not found
    return (
        <div className="p-3 min-h-full flex flex-col">
            <div className="p-3 flex justify-between">
                <h1 className="text-xl">{board_data.title}</h1>
                <Drawer drawerComponent={<HiDotsHorizontal/>}>
                <Settings id={params.slug}></Settings>
                </Drawer>
            </div>
            <hr></hr>
            {/* All the lists will be rendeered here */}
            <div className="flex mt-4 gap-2 max-w-full overflow-x-auto flex-grow  ">

                {
                    board_lists.map(board_list => {
                        return (
                            <ListCard key={`list-${board_list.id}`} board_list={board_list}/>
                        )
                    })
                }
                
                <AddAnotherList board_id={params.slug}/>
         
            </div>
        </div>
    )
}