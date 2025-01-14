
import { jwtDecode } from "jwt-decode";

import { getCookie } from "../lib/auth";
import { getTemplateImages } from "../lib/db_queries/boards";
import { FaUserCircle } from "react-icons/fa";
import { UserUpdate } from "../components/Forms/UserUpdateForm";


export default async function Boards(){

      // getting the access token and user_id from the cookie
  const token = getCookie('access_token');
  // contains the user_id and username
  const decodedToken = jwtDecode(token);
  
  const template_images = await getTemplateImages()


    return (
        <div className="w-full h-full">
   
            {/* Header */}
            <div className="flex justify-center p-10 items-center text-gray-500 ">
                <h1 className="text-black font-semibold text-5xl flex gap-2"><FaUserCircle /> Update User Details</h1> 
            </div>
            <hr/>
            {/* Form to update user details */}
            <div className=" p-4 flex flex-col items-center">
                <UserUpdate/>
            </div>
         

        </div>
    )
}