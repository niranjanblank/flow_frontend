import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { updateBoardImage } from "@/app/lib/db_queries/boards";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function CustomBackgroundUpload({ board_id }: { board_id: number }) {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        // Check if files were selected
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0]; // Get the first selected file
            const reader = new FileReader(); // Create a new FileReader object to read the file
    
            // Define what happens when the file has been read
            reader.onload = () => {
                setUploadedImage(reader.result as string); // Set the uploaded image as a data URL for preview
            };
    
            // Read the file as a data URL (base64 encoded string)
            reader.readAsDataURL(file);
    
            setLoading(true); // Set loading state to true, indicating the upload is in progress
            setError(null); // Clear any previous errors
    
            // Call the function to upload the image to the server
            const result = await updateBoardImage(file, board_id);
    
            setLoading(false); // Set loading state to false, indicating the upload is complete
    
            if (result.success) {
                console.log("Image uploaded successfully:", result.data); // Log success message and data
                toast.success("Background updated")
                router.refresh()
            } else {
                console.error("Failed to upload image:", result.data); // Log error message and data
                toast.error("Failed to update background")
                setError(result.data || "Failed to upload image."); // Set error state with a meaningful message
            }
        }
    };
    return (
        <div className="flex flex-col items-start">
            <h1 className="text-xs">Custom Background</h1>
            <div className="grid grid-cols-2 gap-2 w-full">
                <div className="h-[80px] flex items-center justify-center bg-gray-300 rounded-md cursor-pointer">
                    <label className="flex items-center justify-center w-full h-full">
                        <FaPlus className="text-gray-600" />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </label>
                </div>
                {uploadedImage && (
                    <img src={uploadedImage} className="h-[80px] w-full object-cover rounded-md" alt="Uploaded Background" />
                )}
            </div>
            {loading && <p className="text-xs text-blue-500">Uploading...</p>}
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}
