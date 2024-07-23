"use client"
import { useRouter } from "next/navigation";

// delete the list
async function deleteList(id: number){
    const response = await fetch(`http://localhost:8000/board_list/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }});
    const data = await response.json();
    return data
  }




export default function ListSettingMenu({list_id}:{list_id: number}){

    const router = useRouter()
    
    const onDeleteHandler = async (id:number) => {
        const delete_result =  await deleteList(id)
        console.log(delete_result)
        if (delete_result.deleted){
            router.refresh()
        }
    }

    return(
    <div className="bg-zinc-700 w-64 py-2 px-2 rounded-md border-gray-500 text-sm">
        {/* heading  */}
        <div className="mb-2 px-2">
        List Actions
        </div>
        <hr></hr>
        <div className="mt-2 py-1 px-2 hover:bg-zinc-600 rounded-md" onClick={()=>{onDeleteHandler(list_id)}}>
            <h1>Delete List</h1>
        </div>
       
    </div>
    )
}