import { updateBoardImageUrl } from "@/app/lib/db_queries/boards";
import { Board } from "../../interfaces";
import { CustomBackgroundUpload } from "./custom-background-upload";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function UpdateBackGround({template_images, board}:{template_images: string[], board: Board}){

        const router = useRouter();
 // Call the function to upload the image to the server

    const onBackgroundImageClickHandler = async (background_image_url: string) => {
        if (background_image_url != board.background_image_url){
            const result = await updateBoardImageUrl(board.id, background_image_url);

            if(result.success){
                toast.success("Background image upgraded")
                router.refresh()
            }
            else {
                toast.error("Failed to update he background image")
            }
        } 
       

    }
    return (
        <div className="relative flex flex-col w-64 p-4  rounded-lg gap-3">

            <div>
            <h2 className="text-xs">Current Background</h2>
                {/* current background */}
                <img src={board.background_image_url} className="h-[80px] object-cover rounded-md" />
            </div>

            <div >
                <h2 className="text-xs">Select Background</h2>
                <div className="grid grid-cols-2 gap-2">

                    {template_images.map((image, index)=> (
                        <div className="relative" key={index} onClick={()=>onBackgroundImageClickHandler(image)}> 
                        <img src={image} className="h-[80px] object-cover rounded-md" />
                        {/* this will overlay over the image which is the current background */}
                        {image == board.background_image_url && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md flex items-center justify-center">
                                   <span className="text-white text-xs">Selected</span>
                            </div>
                        )}
                        </div>
                    ))}
                    {/* render available background image */}
                </div>
            </div>
            {/* image will be uploaded here */}
            <div>
                <CustomBackgroundUpload board_id={board.id}/>
            </div>
        </div>
    )
}