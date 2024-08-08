"use client"

import ListCard from "@/app/components/List/ListCard"
import { Board, List } from "../../interfaces"
import { DragDropContext, Droppable } from "@hello-pangea/dnd"
import AddAnotherList from "@/app/components/List/AddAnotherListCard"

export default function ListContainer({board_data}:{board_data: Board}){
    return(
        <DragDropContext
        onDragEnd={()=>{}}
        >
        <Droppable droppableId="lists" type="list" direction="horizontal">
            {
            (provided) =>  (
                <div className="flex mt-4 gap-2 max-w-full overflow-x-auto flex-grow"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    >
                    {
                        board_data.board_lists.map((board_list: List, index) => {
                            return (
                                <ListCard key={`list-${board_list.id}`} board_list={board_list} index={index}/>
                            )
                        })
                    }
                    {provided.placeholder}
                    <AddAnotherList board_id={board_data.id}/>
                 </div>
                )
            
        }
        </Droppable>
        
    
        </DragDropContext>
  
    )
}