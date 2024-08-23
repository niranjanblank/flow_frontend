"use client"

import ListCard from "@/app/components/List/ListCard"
import { Board, List, Label } from "../../interfaces"
import { DragDropContext, Droppable } from "@hello-pangea/dnd"
import AddAnotherList from "@/app/components/List/AddAnotherListCard"
import { useEffect, useState } from "react"
import { updateListOrder } from "@/app/lib/db_queries/lists"
import { updateCardOrder } from "@/app/lib/db_queries/cards"
import { useRouter } from "next/navigation"





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


export default function ListContainer({board_list_data, board_id, labels}:{board_list_data: List[], board_id:number, labels: Label[]}){
    const [data, setData] = useState(board_list_data)

    const router = useRouter()

    useEffect(()=> {
         // Sort the lists by order in ascending order
         const sortedLists = board_list_data.map(list => ({
            ...list,
            list_cards: list.list_cards.sort((a, b) => a.order - b.order) // Sort cards within each list
        })).sort((a, b) => a.order - b.order) // Sort lists

        setData(sortedLists)
    },[board_list_data])


    const onDragEnd = async (result: any) => {
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
        if (type === "list"){
            const items = reorderData(data, source.index, destination.index).map((item,index) => ({
                ...item, order: index
            }))

            setData(items)

            // updating on backend
            if  (await updateListOrder({board_lists: items, board_id:board_id})){
                router.refresh()
            }

        }

        // moving a card

        if (type== "card"){
            let newOrderedData = [...data]
            let sourceDroppableId  = parseInt(source.droppableId.split("-")[1])
            let destDroppableId = parseInt(destination.droppableId.split("-")[1])
            // source and destination list
            const sourceList = newOrderedData.find(list => list.id === sourceDroppableId)
            const destList = newOrderedData.find(list=> list.id === destDroppableId)
            if (!sourceList || !destList){
                return
            }

            // check if cards exists on the sourceList
            if (!sourceList.list_cards){
                sourceList.list_cards = []
            }

            // check if cards exists on destination list
            if (!destList.list_cards){
                destList.list_cards = []
            }

            // Moving the card in the same list
            if (sourceDroppableId === destDroppableId){

                const reorderedCards = reorderData(
                    sourceList.list_cards,
                    source.index,
                    destination.index
                )

                reorderedCards.forEach((card, idx)=> {card.order =idx})

                sourceList.list_cards = reorderedCards
    
                setData(newOrderedData)
                // update to db
                if (await updateCardOrder({board_id:board_id, cards: reorderedCards})){
                    router.refresh()
                }

               
            }
            else {
            // moving the card to  another list
            // reomove card from the source list
            const [movedCard] = sourceList.list_cards.splice(source.index, 1)

            // assign the new list id to the moved card
            movedCard.list_id = destDroppableId
            
            // add card to the destination list
            destList.list_cards.splice(destination.index,0, movedCard)

             // update the orrder forr each card in the source list
            sourceList.list_cards.forEach((card,index)=> {
                card.order = index
            })

            // update the orrder forr each card in the destination list
            destList.list_cards.forEach((card,index)=> {
                card.order = index
            })

            setData(newOrderedData)

            // update db here
      
            if (await updateCardOrder({board_id:board_id, cards: sourceList.list_cards.concat(destList.list_cards)})){

                router.refresh()

            }


            }


        }

    }
    return(
        <DragDropContext
        onDragEnd={onDragEnd}
        >
        <Droppable droppableId="lists" type="list" direction="horizontal">
            {
            (provided) =>  (
                <div className="flex mt-4 gap-2 px-2 max-w-full overflow-x-auto flex-grow"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    >
                    {
                        data.map((board_list: List, index) => {
                            return (
                                <ListCard key={`list-${board_list.id}`} 
                                labels ={labels}
                                board_list={board_list} index={index}/>
                            )
                        })
                    }
                    {provided.placeholder}
                    <AddAnotherList board_id={board_id}/>
                 </div>
                )
            
        }
        </Droppable>
        
    
        </DragDropContext>
  
    )
}