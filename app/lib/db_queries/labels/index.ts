// delete the label
export async function deleteLabel(id: number){
    const response = await fetch(`http://localhost:8000/labels/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }});
    const data = await response.json();
    return data
  }

  

// assign the label 
export async function assignLabel(card_id:number, label_id: number){
  try{
    const data_to_post = {
      card_id : card_id,
      label_id : label_id
    }
    const response = await fetch(`http://localhost:8000/card-labels`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data_to_post)
    })

    
    const result = await response.json();
    return { success: true, data: result}
  }
  catch (error) {
    console.log("Error adding label to list", error);
    let errorMessage = "An unknown error occurred";

    // Handle the error correctly based on its type
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, data: errorMessage}
  }
}


// delete the label and card link 
export async function deleteLabelCardLink(card_id:number, label_id: number){
  try{
    const response = await fetch(`http://localhost:8000/card-labels/${card_id}/${label_id}`,{
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      }
    })

    
    const result = await response.json();
    return { success: true, data: result}
  }
  catch (error) {
    console.log("Error deleting label from the card", error);
    let errorMessage = "An unknown error occurred";

    // Handle the error correctly based on its type
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, data: errorMessage}
  }
}