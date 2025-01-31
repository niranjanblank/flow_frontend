
import { jwtDecode } from "jwt-decode";

import { getCookie } from "../lib/auth";
import { getTemplateImages } from "../lib/db_queries/boards";
import { FaUserCircle } from "react-icons/fa";
import { UserUpdate } from "../components/Forms/UserUpdateForm";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PasswordUpdate } from "../components/Forms/PasswordUpdateForm";
import { getUserById } from "../lib/db_queries/users";
export default async function Boards(){

      // getting the access token and user_id from the cookie
  const token = getCookie('access_token');
  // contains the user_id and username
  const decodedToken = jwtDecode(token);
  
    // get user data from backend
    const userData = await getUserById(decodedToken.user_id)
    console.log(userData)


    return (
        <div className="w-full h-full">
   {}
            {/* Header */}
            <div className="flex justify-center p-10 items-center text-gray-500 ">
                <h1 className="text-black font-semibold text-5xl flex gap-2"><FaUserCircle /> Update User Details</h1> 
            </div>
            <hr/>
            {/* Form to update user details */}
            <div className=" p-4 flex flex-col items-center justify-center ">
                <Tabs defaultValue="account" className="w-2/4 p-6 border rounded-lg bg-zinc">
                    <TabsList>
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="password">Password</TabsTrigger>
                       
                    </TabsList>
                    <TabsContent value="account">
                        <p className="text-gray-700 py-4">
                        Make changes to your account here. Click save when you're done.
                        </p>
                    <UserUpdate/>
                    </TabsContent>
                    <TabsContent value="password">
                    <p className="text-gray-700 py-4">
                    Change your password here.
                    </p>
                    <PasswordUpdate/>
                    </TabsContent>
                </Tabs>
            </div>
       
         

        </div>
    )
}