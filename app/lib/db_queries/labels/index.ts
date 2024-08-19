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

  

