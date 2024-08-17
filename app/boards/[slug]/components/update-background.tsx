import { Board } from "../../interfaces";
import { CustomBackgroundUpload } from "./custom-background-upload";

export function UpdateBackGround({template_images, board}:{template_images: string[], board: Board}){
    return (
        <div className="relative flex flex-col w-64 p-4 bg-zinc-900 rounded-lg -ml-40 gap-3">


            <h1>Update Background</h1>
            <div>
            <h2 className="text-xs">Current Background</h2>
                {/* current background */}
                <img src={board.background_image_url} className="h-[80px] object-cover rounded-md" />
            </div>

            <div >
                <h2 className="text-xs">Select Background</h2>
                <div className="grid grid-cols-2 gap-2">

                    {template_images.map((image, index)=> (
                        <div className="relative" key={index}> 
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