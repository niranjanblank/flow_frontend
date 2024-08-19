"use client"
import { useEffect, useState } from "react";
import { CreateLabel } from "./create-label";
import { Label } from "@/app/boards/interfaces";
import Drawer from "@/app/components/Dialogs/Drawer";
import { MdEdit } from "react-icons/md";
import UpdateLabel from "./update-label";
import { MdDeleteForever } from "react-icons/md";
import { deleteLabel } from "@/app/lib/db_queries/labels";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export default function Labels ({board_id, label_data}: {board_id: number, label_data: Label[]}) {
    const [labels, setLabels] = useState<Label[]>(label_data);

    // added to avoid hydration error
    const [isMounted, setIsMounted] = useState(false);


    const router = useRouter()
    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(()=> {
      setLabels(label_data)
    },[label_data])

    if (!isMounted) return null;

      // delete the label
      const onDeleteHandler = async (id:number) => {
        const deleted_data = await deleteLabel(id)

        if(deleted_data.deleted){
        toast.info("Label deleted")
        router.refresh()

              // Update the state by filtering out the deleted label
        setLabels((prevLabels) => prevLabels.filter(label => label.id !== id));

        router.refresh(); // Trigger a refresh to ensure server-side consistency
        }
        else{
            toast.error("Failed to delete label")
        }
    }

  return (
    <div className="flex flex-col items-center ">
        <div className="flex flex-col w-full p-2 gap-1">
            {labels.map((label,index)=>(
                <div 
                key={`label-${index}`}
                className="flex w-full gap-1">
                  <div
                  className="rounded-md flex w-full justify-center items-center p-2"
                  style={{backgroundColor:label.color}}
                  >{label.title}</div>

                  <Drawer 
                  title="Update Label"
                  drawerComponent={<button className="p-3 bg-slate-600 hover:bg-slate-700 rounded-md"><MdEdit/></button>}
                  >
                    <UpdateLabel label={label}/>
                  </Drawer>
                  <button className="p-3 bg-red-500 hover:bg-red-700 rounded-md text-white" onClick={()=> {onDeleteHandler(label.id)}}><MdDeleteForever /></button>
                 
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