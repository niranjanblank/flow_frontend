import BoardCard from "../components/Board/BoardCard";
import BoardList from "../components/Board/BoardList";
import Popover from "../components/Dialogs/Popover";
import CreateBoard from "../components/Forms/CreateBoard";
import { Navbar } from "../components/Navbar/Navbar";

export default function Boards(){
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
                <Popover content={<CreateBoard/>}>
                    <div className="p-2 rounded-md text-gray-300 bg-gray-800 w-56 flex flex-col justify-center items-center h-full">

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