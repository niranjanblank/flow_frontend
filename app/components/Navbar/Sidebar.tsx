import { Navbar } from "./Navbar";
import { FaPlus } from "react-icons/fa"
import Popover from "../Dialogs/Popover";
import CreateBoard from "../Forms/CreateBoard";
import axios from "axios";

async function getBoardsOfCurrentUser(){
  // const response = await fetch("http://localhost:8000/boards/owner/1", {next: {
  //   revalidate: 5
  // }});
  const response = await fetch("http://localhost:8000/boards/owner/1", { cache: 'no-store' });
  const data = await response.json();
  return data
}
export  default async function Sidebar(){
  const board_data = await getBoardsOfCurrentUser()
    return (
        <Navbar>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-sm">
            <h1>Your boards</h1>
            <Popover content={<CreateBoard/>}>
              <button><FaPlus /></button>
            </Popover>
          </div>
          <ul className="text-xs ml-1 flex flex-col gap-1">
            {board_data.map((board: any) => {
              return (<li key={`board-${board.id}`}>{board.title}</li>)
            })}
  
          </ul>
        </div>
      </Navbar>
    )
}