import { List } from "@/app/boards/interfaces"


interface UpdateListOrderData{
    order: number
}

interface UpdateDataWithBoard {
    board_id : number
    board_lists: List[]
}

interface UpdateTitle {
    list: List
    title: string
}

export async function updateListOrder (data: UpdateDataWithBoard){
    
    const {board_lists, board_id} = data
    console.log(board_lists)
    try {
        // iterating through the list
        const updatePromises = board_lists.map(async (list) => {
            const data_to_post: UpdateListOrderData = {
                order: list.order,
            };

       
            // updating the order of the list
            const response = await fetch(`http://localhost:8000/board_list/${list.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data_to_post),
            });

            if (!response.ok) {
                throw new Error(`Failed to update list with ID: ${list.id}`);
            }

            const result = await response.json();
            console.log(`List with ID: ${list.id} updated successfully`, result);
        });

        await Promise.all(updatePromises);
        console.log('All lists updated successfully.');
        return true
    } catch (error) {
        console.log("Error updating lists", error);
        return false
    }
  
}

export async function updateListTitle(data:UpdateTitle) {
        
    const {list, title} = data
    try {

            const data_to_post = {
                title: title
            }

       
            // updating the order of the list
            const response = await fetch(`http://localhost:8000/board_list/${list.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data_to_post),
            });

            if (!response.ok) {
                throw new Error(`Failed to update list with ID: ${list.id}`);
            }

            const result = await response.json();
            console.log(`List with ID: ${list.id} updated successfully`, result);
            if (result) {
                return true
            }
    
    }
    catch (error) {
        console.log("Error updating lists", error);
        return false
    }
}