export async function getBoardsOfCurrentUser(user_id: number){
    // const response = await fetch("http://localhost:8000/boards/owner/1", {next: {
    //   revalidate: 5
    // }});
    const response = await fetch(`http://localhost:8000/boards/owner/${user_id}`, { cache: 'no-store' });
    const data = await response.json();
    return data
  }

// delete the board
export async function deleteBoard(id: number){
    const response = await fetch(`http://localhost:8000/boards/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }});
    const data = await response.json();
    return data
  }

  
// get individual board information
export async function getBoardData(id: number){
    const response = await fetch(`http://localhost:8000/boards/${id}`, { cache: 'no-store' });
    const data = await response.json();
    return data
  }



  // get individual board information
export async function getBoardLists(id: number){
    const response = await fetch(`http://localhost:8000/board_list/${id}`, { cache: 'no-store' });
    const data = await response.json();
    return data
  }

