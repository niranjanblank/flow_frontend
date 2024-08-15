import { Card } from "@/app/boards/interfaces"


interface UpdateCardOrderData{
    order: number
    list_id: number | null
}

interface UpdateData {
    board_id : number
    cards: Card[]
}

export async function updateCardOrder (data: UpdateData){
    
    const {cards, board_id} = data

    try {
        // iterating through the list
        const updatePromises = cards.map(async (card) => {
            const data_to_post: UpdateCardOrderData = {
                order: card.order,
                list_id: card.list_id
            };

       
            // updating the order of the list
            const response = await fetch(`http://localhost:8000/list_card/${card.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data_to_post),
            });

            if (!response.ok) {
                throw new Error(`Failed to update card with ID: ${card.id}`);
            }

            const result = await response.json();
            console.log(`Card with ID: ${card.id} updated successfully`, result);
        });

        await Promise.all(updatePromises);
        console.log('All cards updated successfully.');
        return true;
    } catch (error) {
        console.log("Error updating cards", error);
        return false
    }
  
}

// delete the card
export async function deleteCard(id: number){
    const response = await fetch(`http://localhost:8000/list_card/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }});
    const data = await response.json();
    return data
  }

  

