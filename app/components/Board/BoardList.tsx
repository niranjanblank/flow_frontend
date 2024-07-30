import { getCookie } from "@/app/lib/auth";
import BoardCard from "./BoardCard";
import { jwtDecode } from "jwt-decode";
import { getBoardsOfCurrentUser } from "@/app/lib/db_queries";



export  default async function BoardList(){

  // getting the access token and user_id from the cookie
  const token = getCookie('access_token');
  const decodedToken = jwtDecode(token);

  const board_data = await getBoardsOfCurrentUser(decodedToken.user_id)
  
    return (
        <>
          {board_data.map((board: any) => {
              return (
                  <BoardCard key={`board-${board.id}`} id={board.id} title={board.title} description={board.description}/>
              )
            })}

        </>
    )
}