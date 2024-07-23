import { HiDotsHorizontal } from "react-icons/hi";
import Popover from "../Dialogs/Popover";
import ListSettingMenu from "./ListSettingMenu";
// setting page to render the settings of the list 


export default function ListSetting({list_id}:{list_id: number}){
    return (
        <>
        <Popover content={(<ListSettingMenu list_id={list_id}/>)}>
        <div className="hover:bg-zinc-600 p-1 rounded-md">
            <HiDotsHorizontal />
        </div>
        </Popover>
        </>
    )
}