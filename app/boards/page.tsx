
import { jwtDecode } from "jwt-decode";
import BoardList from "../components/Board/BoardList";
import Popover from "../components/Dialogs/Popover";
import CreateBoard from "../components/Forms/CreateBoard";
import { getCookie } from "../lib/auth";



export default async function Boards(){

      // getting the access token and user_id from the cookie
  const token = getCookie('access_token');
  // contains the user_id and username
  const decodedToken = jwtDecode(token);

    return (
        <div className="w-full h-full">
            {/* Header */}
            <div className="flex justify-center p-10 items-center text-gray-500 ">
                <h1 className="text-3xl font-bold">SoloPlanner</h1>
            </div>
            <hr/>

{/* all the boards and create board */}
        <div className="flex justify-center p-8">
            <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 ">
                <Popover content={<CreateBoard user_id={decodedToken.user_id}/>}>
                    <div className="p-2 rounded-md text-gray-300 bg-gray-800 w-56 min-h-28 flex flex-col justify-center items-center h-full">

                        <h1 className="text-xs">
                            Create new board
                        </h1>
                        
                            <h1 className="text-xs">
                                5 left
                            </h1>
                    </div>
                </Popover>
                <BoardList/>
                </div>
            </div>
        </div>
    )
}