import BoardCard from "./BoardCard";

async function getBoardsOfCurrentUser(){
  const response = await fetch("http://localhost:8000/boards/owner/1", { cache: 'no-store' });
  const data = await response.json();
  return data
}
export  default async function BoardList(){
  const board_data = await getBoardsOfCurrentUser()
    return (
        <>
          {board_data.map((board: any) => {
              return (
                <BoardCard key={`board-${board.id}`} title={board.title} description={board.description}/>
              )
            })}
        

        </>
    )
}