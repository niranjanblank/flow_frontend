import { useState } from "react";
import { CreateLabel } from "./create-label";
import { Label } from "@/app/boards/interfaces";
import Drawer from "@/app/components/Dialogs/Drawer";

export default function Labels ({board_id, label_data}: {board_id: number, label_data: Label[]}) {

  return (
    <div className="flex flex-col items-center ">
        <div className="flex flex-col w-full p-2 gap-1">
            {label_data.map((label,index)=>(
                <div 
                key={`label-${index}`}
                className="flex w-full gap-1">
                  <div
                  className="rounded-md flex w-full justify-center items-center p-2"
                  style={{backgroundColor:label.color}}
                  >{label.title}</div>
                  <button>Edit</button>
                </div>
              ))}
        </div>
        <Drawer
        title="Create Labels"
        drawerComponent={
            <div
            className="bg-blue-500 p-2 w-[278px] text-sm rounded-md text-white"
            >Create Label</div>
        }
        >
            <CreateLabel board_id={board_id}/>
        </Drawer>
     
        
    </div>
  );
}