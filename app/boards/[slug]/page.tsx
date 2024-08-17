// Renders the details of the individual board page based on slug

import Drawer from "@/app/components/Dialogs/Drawer";
import { HiDotsHorizontal } from "react-icons/hi";
import Settings from "./settings";
import AddAnotherList from "@/app/components/List/AddAnotherListCard";
import {  getBoardDataWithListAndCard } from "@/app/lib/db_queries";
import { Board} from "../interfaces";
import ListContainer from "./components/list-container";
import { getTemplateImages } from "@/app/lib/db_queries/boards";


export default async function BoardDetails(
    {params}: {
        params: {
            slug: number
        }
    }
)
{
    
    const board_data:Board = await getBoardDataWithListAndCard(params.slug)
    const template_images: string[] = await getTemplateImages()
   // need to implement logic when data is not found
    return (
        <div className="p-3 min-h-full flex flex-col ">
            <div className="p-3 flex justify-between">
                <h1 className="text-xl">{board_data.title}</h1>
                <Drawer drawerComponent={<HiDotsHorizontal/>}>
                    <Settings board={board_data}
                    template_images={template_images}
                    ></Settings>
                </Drawer>
            </div>
            <hr></hr>
            {/* All the lists will be rendeered here */}
            
            <ListContainer board_list_data={board_data.board_lists} board_id={board_data.id} />
               
    
           
        </div>
    )
}