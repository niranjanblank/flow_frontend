"use client"

import { Label } from "@/app/boards/interfaces"
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup"

export default function UpdateLabel({label}:{label: Label}){
    const [color, setColor] = useState(label.color);
    console.log(label)
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            title: label.title,
            color: label.color,
        },
        validationSchema: Yup.object({
            title: Yup.string(),
            color: Yup.string().required()
        }),
        onSubmit: async values => {


            // Handle form submission here
            const data_to_post = {
               title: values.title,
               color: values.color,
            };

      

            try {
                console.log(data_to_post)
                if(values.title.length < 1){
                    toast.error("Please add title to label")
                }
                else{
                    const response = await fetch(`http://localhost:8000/labels/${label.id}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(data_to_post),
                                credentials: 'include'
                            });
                            const data = await response.json();
                            if (data) {
                                toast.success("Label Updated")
                                router.refresh()
                            }
                }
                

            } catch (error) {
                console.log("Card couldn't be updated");
                console.error(error);
            }
        }
    })

    // handle color change and sync it with formik

  
    const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
        setColor(event.target.value);
        formik.setFieldValue('color', color)
      };

    return (
        <div className="flex p-2 gap-2 w-full flex-col">
            <div
            className="rounded-md flex justify-center items-center p-2"
            style={{backgroundColor:formik.values.color}}
            >{formik.values.title.length > 0? formik.values.title: "Preview"}</div>
            <form
            className="flex flex-col gap-2 w-full"
            onSubmit={formik.handleSubmit}
            >
            <div>
                <label className="text-sm" >Title</label>
                <input type="text" id="title"
               className="w-full bg-zinc-600 p-2 rounded-lg text-sm"
               value={formik.values.title}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
                />
            </div>
            <div>
            <label className="text-sm" >Color</label>
            <input type="color"
            className="w-full"
            value={formik.values.color}
            onChange={handleColorChange} />
            </div>
            <button  
            className=" rounded-lg  p-1 bg-gray-700 hover:bg-gray-800
            "
            type="submit">Update</button>
            </form>
        </div>
    )
}