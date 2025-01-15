"use client"


import * as Yup from "yup"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import moment from "moment";


export function PasswordUpdate(){




    return (
        <form className=" bg-green-40 rounded-lg  flex flex-col items-start gap-2 w-full">
           
            <div className="flex flex-col w-full">
                <label>Old Password</label>
                <input type="password"
                className="border-gray-300 border-solid border rounded-md p-2"
                />
            </div>
            <div className="flex flex-col w-full">
                <label>New Password</label>
                <input type="password"
                className="border-gray-300 border-solid border rounded-md p-2"
                />
            </div>
   
            
            <button type="submit" className="bg-gray-600 hover:bg-gray-700 w-fit py-2 px-8 text-white rounded-lg ">
                Save Password
            </button>
        </form>
    )
}
