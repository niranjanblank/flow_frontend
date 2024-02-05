import { Navbar } from "./Navbar";
import { FaPlus } from "react-icons/fa"
import Popover from "../Dialogs/Popover";
import CreateBoard from "../Forms/CreateBoard";

export default function Sidebar(){
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
            <li>Board 1</li>
            <li>Board 2</li>
          </ul>
        </div>
      </Navbar>
    )
}