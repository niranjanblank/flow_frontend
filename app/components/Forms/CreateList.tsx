"use client"

// form to create list inside a board
// takes board_id and setFormActivate as input
// board_id : id of board to which the list belongs to
// setFormActivate: function to set the formActivate state(inside AddAnotherListCard component) to either true or false
    // if true this form component will be activated
    // else AddAnotherListCard will be activated

import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useEffect, useRef } from "react"
import { RxCross2 } from "react-icons/rx"



export default function CreateList({board_id, setFormActivate}:{board_id:number, setFormActivate: Dispatch<SetStateAction<boolean>>}){
    const router = useRouter()

    // this is required for handling clicking outside of component
    const formRef = useRef<HTMLFormElement>(null);

    // Function to handle click events outside of the specified element
    const handleClickOutside = (event: MouseEvent) => {
        // Check if the formRef is set and the clicked target is not a descendant of the form element
        if (formRef.current && !formRef.current.contains(event.target as Node)){
            setFormActivate(false)
        }
    }

  // useEffect hook to set up and clean up the event listener for outside clicks
    useEffect(() => {
        // Add event listener to the document for mousedown events
        document.addEventListener("mousedown", handleClickOutside);
        // Cleanup function to remove the event listener when the component unmounts or before it re-runs
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const formik = useFormik({
        initialValues: {
            title: ''
        },
        validationSchema: Yup.object({
            title: Yup.string()
            .required("Required").min(1)
        }),
        onSubmit: async values => {
            // form submission is handled here
            const data_to_post = {
                title: values.title,
                "board_id": board_id
            }
            //  try to post the data to the endpoint
            try {
                const response = await fetch('http://localhost:8000/board_list', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data_to_post)
                });
                const data = await response.json();
                if (data) {
                    console.log('list created')
                    router.refresh()
                }

            } catch (error) {
                console.log("List couldn't be created");
                console.error(error);
            }
        }
    })
    return (
        <form onSubmit={formik.handleSubmit} ref={formRef}
        className="flex flex-col justify-center items-start bg-zinc-900 text-white rounded-md w-64 p-4 gap-2 h-fit">
        <div className="bg-red w-full  mt-2">
            <input type="text" id="title"
            className="h-fit w-full rounded-sm text-white bg-gray-800 p-2"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter list title..."
            />
       
        </div>
        <div className="flex items-center gap-2">
            <button type="submit" className="h-fit bg-blue-500 text-sm text-black font-semibold rounded hover:bg-blue-400 p-2 ">Add List</button>
            {/* button to close the button */}
            <button className="text-gray-200 text-2xl hover:bg-gray-500 hover:bg-opacity-50 p-2 rounded-md " onClick={()=>{setFormActivate(false)}}><RxCross2/></button>
        </div>
        
        </form>


    )
}