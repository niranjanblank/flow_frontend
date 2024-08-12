import { List } from "@/app/boards/interfaces";
import { updateListTitle } from "@/app/lib/db_queries/lists";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ListHeader({ list_data }: { list_data: List }) {
    const [title, setTitle] = useState(list_data.title);
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter()

    const handleBlur = async () => {
        setIsEditing(false);
        if (title.length > 0){
            if (await updateListTitle({list:list_data, title: title})){
                router.refresh()
            }
        }
        else{
            setTitle(list_data.title)
        }

    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleBlur();
    };

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    return (
        <div onDoubleClick={handleDoubleClick} >
            {isEditing ? (
                <form onSubmit={handleSubmit} className="w-full ">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={handleBlur}
                        autoFocus
                        className=" text-gray-300 w-full bg-transparent outline-none focus:outline focus:outline-2 focus:outline-blue-500 rounded-md px-2"
                    />
                </form>
            ) : (
                <h1 className=" text-gray-300 w-full px-2">{title}</h1>
            )}
        </div>
    );
}
