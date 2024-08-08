"use client"
import { List } from "@/app/boards/interfaces";
import AddCard from "./AddCard";
import ListSetting from "./ListSetting";
import SingleCard from "./SingleCard";
import { Draggable, Droppable } from "@hello-pangea/dnd";



export default function ListCard({board_list, index}:{board_list:List, index: number}){

    return (
        <Draggable
        index={index}
        draggableId={board_list.id.toString()}
        >
        {(provided) => (
            <div 
            {...provided.draggableProps}
            ref={provided.innerRef}
            className="bg-zinc-900 flex flex-col gap-2 text-gray-300 rounded-xl py-3 px-3 min-w-64 h-fit"
            >
                {/* header of the list */}
                <div 
                {...provided.dragHandleProps}
                className="flex justify-between items-center px-2">
                    <h1>{board_list.title}</h1>
                    <ListSetting list_id={board_list.id}/>
                </div>
                {/* for listing cards of list */}
                <Droppable
                    droppableId={board_list.id.toString()} type="card"
                >
                    {(provided)=> (
                        <div className="flex flex-col gap-3 "
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        >
                            {board_list.list_cards.map(card => {
                                return (
                                    <SingleCard card={card} key={`card-${card.id}-list${card.list_id}`}/>
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