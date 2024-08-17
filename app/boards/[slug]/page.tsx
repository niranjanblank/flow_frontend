// Renders the details of the individual board page based on slug

import Drawer from "@/app/components/Dialogs/Drawer";
import { HiDotsHorizontal } from "react-icons/hi";
import Settings from "./settings";
import AddAnotherList from "@/app/components/List/AddAnotherListCard";
import {  getBoardDataWithListAndCard } from "@/app/lib/db_queries";
import { Board} from "../interfaces";
import ListContainer from "./components/list-container";
import { getTemplateImages } from "@/app/lib/db_queries/boards";
import { BoardHeader } from "./components/board-header";


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
        
        <div className=" min-h-full flex flex-col"
        style={{
            backgroundImage: board_data.background_image_url
                ? `url(${board_data.background_image_url})`
                : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: board_data.background_image_url ? 'transparent' : '#1f2937', 
        }}
        >
            <div className="p-3 flex justify-between items-center bg-black bg-opacity-50">
  
                <BoardHeader board={board_data}/>
                <Drawer drawerComponent={<HiDotsHorizontal className="text-gray-200 text-2xl"/>}>
                    <Settings board={board_data}
                    template_images={template_images}
                    ></Settings>
                </Drawer>
            </div>
      
            {/* All the lists will be rendeered here */}
            
            <ListContainer board_list_data={board_data.board_lists} board_id={board_data.id} />
               
        </div>
    )
}