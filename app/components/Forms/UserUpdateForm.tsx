"use client"


import * as Yup from "yup"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import moment from "moment";


export function UserUpdate(){




    return (
        <form className=" bg-green-40 rounded-lg border-gray-300 border  flex flex-col items-center gap-2 p-4 w-1/2">
            <img src="/favicon.png" width={128}/>
            <div className="flex flex-col w-full">
                <label>Full Name</label>
                <input type="text"
                className="border-gray-300 border-solid border rounded-md p-2"
                />
            </div>
            <div className="flex flex-col w-full">
                <label>User Name</label>
                <input type="text"
                className="border-gray-300 border-solid border rounded-md p-2"
                />
            </div>
            <div className="flex flex-col w-full">
                <label>Email</label>
                <input type="text"
                className="border-gray-300 border-solid border rounded-md p-2"
                />
            </div>

            
            <button type="submit" className="bg-gray-600 hover:bg-gray-700 w-fit py-2 px-8 text-white rounded-lg ">
                Save
            </button>
        </form>
    )
}
