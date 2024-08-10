"use client"
import { List } from "@/app/boards/interfaces";
import AddCard from "./AddCard";
import ListSetting from "./ListSetting";
import SingleCard from "./SingleCard";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { ListHeader } from "./ListHeader";





export default function ListCard({board_list, index}:{board_list:List, index: number}){
 


    return (
        <Draggable
        index={index}
        draggableId={`list-${board_list.id.toString()}`}
        >
        {(provided) => (
            <div 
            {...provided.draggableProps}
            ref={provided.innerRef}
            className="bg-zinc-900 flex flex-col gap-2 text-gray-300 rounded-xl py-3 px-3 w-[272px] h-fit"
            >
                {/* header of the list */}
                <div 
                {...provided.dragHandleProps}
                className="flex justify-between items-center gap-2 ">
                    <ListHeader list_data={board_list}/>
                    <ListSetting list_id={board_list.id}/>
                </div>
                {/* for listing cards of list */}
                {/* droppable for the card */}
                <Droppable
                    droppableId={`card-${board_list.id.toString()}`} type="card"
                >
                    {(provided)=> (
                        <div className="flex flex-col gap-3 min-h-1 "
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        >
                            {board_list.list_cards.map((card,index) => {
                                return (
                                    <SingleCard card={card} key={`card-${card.id}-list${card.list_id}`} index={index}/>
                                )
                            })}
                            {provided.placeholder}  
                        </div>
                    )}
                </Droppable>
                <AddCard list_id={board_list.id}/>
            </div>
        )}
   
        </Draggable>
    )
} 