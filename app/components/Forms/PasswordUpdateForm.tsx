"use client"


import * as Yup from "yup"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import moment from "moment";
import { toast } from "react-toastify";


export function PasswordUpdate({user_id}: {user_id: number}){
        const router = useRouter();
        const formik = useFormik({
            initialValues: {
                old_password: "",
                new_password: ""
            },
            validationSchema: Yup.object({
                old_password: Yup.string().required("Please enter password").min(4,"Must be at least 4 characters"),
                new_password: Yup.string().required("Please enter password").min(4,"Must be at least 4 characters")
            }),
            onSubmit: async values => {
                const updatePassword = {
                    old_password : values.old_password,
                    new_password: values.new_password
                }
    
                // send the put request
                try {
                    const response = await fetch(`http://localhost:8000/users/update/password/${user_id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatePassword),
                        credentials: 'include'
                    });
                    
                    if (!response.ok){
                        if (response.status === 400) {
                            const errorData = await response.json();
                            toast.error(`${errorData.detail || "Invalid input"}`);
                            return;
                        }
                        
                        throw new Error("Failed to update password")
                    }
                    const data = await response.json();

    
                    if (data) {
                        toast.success(data.detail)
                        router.refresh()
     
                    }
                } catch (error) {
                    toast.error("Password couldnt be updated. ", error.message)
                    console.error(error);
                }
               
            }
        })

    return (
        <form className=" bg-green-40 rounded-lg  flex flex-col items-start gap-2 w-full"
        onSubmit={formik.handleSubmit}
        >
           
            <div className="flex flex-col w-full">
                <label>Old Password</label>
                <input 
                   id="old_password"
                   value={formik.values.old_password}
                   onChange={formik.handleChange}
                   onBlur={formik.handleBlur}
                   type="password"
                   className="border-gray-300 border-solid border rounded-md p-2"
                />
                   {(formik.touched.old_password && formik.errors.old_password) && <p className="text-red-600 pt-2 text-xs">{formik.errors.old_password}</p>}
            </div>
            <div className="flex flex-col w-full">
                <label>New Password</label>
                <input 
                    id="new_password"
                    value={formik.values.new_password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="password"
                    className="border-gray-300 border-solid border rounded-md p-2"
                />
                 {(formik.touched.new_password && formik.errors.new_password) && <p className="text-red-600 pt-2 text-xs">{formik.errors.new_password}</p>}
            </div>
   
            
            <button type="submit" className="bg-gray-600 hover:bg-gray-700 w-fit py-2 px-8 text-white rounded-lg ">
                Save Password
            </button>
        </form>
    )
}
