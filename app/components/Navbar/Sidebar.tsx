import { Navbar } from "./Navbar";
import { FaPlus } from "react-icons/fa"
import Popover from "../Dialogs/Popover";
import CreateBoard from "../Forms/CreateBoard";
import BoardSideBar from "./BoardSideBar";
import { getCookie } from "@/app/lib/auth";
import { jwtDecode } from "jwt-decode";
import { getBoardsOfCurrentUser } from "@/app/lib/db_queries";
import { getTemplateImages } from "@/app/lib/db_queries/boards";


export  default async function Sidebar(){

  // getting the access token and user_id from the cookie
  const token = getCookie('access_token');
  // contains the user_id and username
  const decodedToken = jwtDecode(token);

  // get username
  const board_data = await getBoardsOfCurrentUser(decodedToken.user_id)
  // get template_images
  const template_images = await getTemplateImages()
    return (
        <Navbar>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-sm">
            <h1>Your boards</h1>
            <Popover content={<CreateBoard user_id={decodedToken.user_id} template_images={template_images}/>}>
              <button><FaPlus className="" /></button>
            </Popover>
          </div>
          {/* Menu for the boards */}
          <BoardSideBar board_data={board_data}/>
        </div>
      </Navbar>
    )
}