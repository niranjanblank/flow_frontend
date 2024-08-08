"use client"

import ListCard from "@/app/components/List/ListCard"
import { Board, List } from "../../interfaces"
import { DragDropContext, Droppable } from "@hello-pangea/dnd"
import AddAnotherList from "@/app/components/List/AddAnotherListCard"
import { useEffect, useState } from "react"




function reorderData<T>(list: T[], startIndex: number, endIndex: number){
    // Create a copy of the input array
    const result = Array.from(list)
      // Remove the item from the startIndex
    const [removed] = result.splice(startIndex,1)

    // Insert the removed item at the endIndex
    result.splice(endIndex, 0, removed)

    // Return the reordered array
    return result
}


export default function ListContainer({board_data}:{board_data: Board}){
    const [data, setData] = useState(board_data)

    
    useEffect(()=> {
        setData(board_data)
    },[board_data])


    const onDragEnd = (resul: any) => {
        const {destination, source, type} = result

        if (!destination) {
            return
        }

        // dropped in same position
        if (destination.droppableId == source.droppableId 
            && destination.index == source.index
        ){
            return
        }

        // moving a list
        // if (type === "list"){
        //     const items = reorderData(data, source.index, destination.index).map((item,index) => ({
        //         ...item, order: index
        //     }))

        //     setData(items)
        // }

    }
    return(
        <DragDropContext
        onDragEnd={onDragEnd}
        >
        <Droppable droppableId="lists" type="list" direction="horizontal">
            {
            (provided) =>  (
                <div className="flex mt-4 gap-2 max-w-full overflow-x-auto flex-grow"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    >
                    {
                        data.board_lists.map((board_list: List, index) => {
                            return (
                                <ListCard key={`list-${board_list.id}`} board_list={board_list} index={index}/>
                            )
                        })
                    }
                    {provided.placeholder}
                    <AddAnotherList board_id={data.id}/>
                 </div>
                )
            
        }
        </Droppable>
        
    
        </DragDropContext>
  
    )
}