"use client"


import * as Yup from "yup"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import moment from "moment";
import { User } from "@/app/lib/db_queries/users/interface";


export function UserUpdate({user}:{user: User}){
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            fullname: user.full_name || "",
            username: user.username,
            description: user.description || "",
            email: user.email
        },
        validationSchema: Yup.object({
            fullname: Yup.string(),
            username: Yup.string(),
            email: Yup.string().required('Please enter a valid email').email("Please enter a valid email"),
            description: Yup.string()
        }),
        onSubmit: async values => {
            const userUpdateDetails = {
                full_name : values.fullname,
                description: values.description
            }

            // send the put request
            try {
                const response = await fetch(`http://localhost:8000/users/update/${user.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userUpdateDetails),
                    credentials: 'include'
                });
                const data = await response.json();
                if (data) {
                    console.log("User updated");
                    router.refresh()
                    console.log(data)
                }
            } catch (error) {
                console.log("User couldn't be updated");
                console.error(error);
            }
           
        }
    })


    return (
        <form className=" bg-green-40 rounded-lg  flex flex-col items-start gap-2 w-full"
        onSubmit={formik.handleSubmit}
        >
           
            <div className="flex flex-col w-full">
                <label>Full Name</label>
                <input type="text"
                id="fullname"
                value={formik.values.fullname}
                onChange={formik.handleChange}
                className="border-gray-300 border-solid border rounded-md p-2"
                />
            </div>
            <div className="flex flex-col w-full">
                <label>User Name</label>
                <input type="text"
                      id="username"
                      disabled
                      value={formik.values.username}
                      onChange={formik.handleChange}
                className="border-gray-300 border-solid border rounded-md p-2 text-gray-600"
                />
            </div>
            <div className="flex flex-col w-full">
                <label>Email</label>
                <input type="text"
                id="email"
                disabled
                value={formik.values.email}
                onChange={formik.handleChange}
                className="border-gray-300 border-solid border rounded-md p-2 text-gray-600"
                />
            </div>
            <div className="flex flex-col w-full">
            <textarea
                id="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                className='px-2 pt-2 rounded-md min-h-24 border-gray-300 border border-solid' 
                placeholder='Add a more detailed description'
            ></textarea>
              </div>
            
            <button type="submit" className="bg-gray-600 hover:bg-gray-700 w-fit py-2 px-8 text-white rounded-lg ">
                Save Changes
            </button>
        </form>
    )
}
