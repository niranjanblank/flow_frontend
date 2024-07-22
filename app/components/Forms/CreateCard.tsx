"use client"

import { useFormik } from "formik"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useEffect, useRef } from "react"
import { RxCross2 } from "react-icons/rx"
import * as Yup from "yup"

// form to create card inside the list

export default function CreateCard({list_id, setIsFormActive}:{list_id:number, setIsFormActive: Dispatch<SetStateAction<boolean>>}){

    // reference to close the form when clicked outside 
    const formRef = useRef<HTMLFormElement>(null);

    // router to  refresh the path when new card is added
    const router = useRouter()

    // function to handle click events outside of the specified element
    const handleClickOutside = (event: MouseEvent) => {
        // event.target is the target on position of mouse on mousedown
        if (formRef.current && !formRef.current.contains(event.target as Node)){
            setIsFormActive(false)
        }
    }

    // useEffect to set up anc clean up the event listener for outside clicks
    useEffect(()=>{
        document.addEventListener("mousedown", handleClickOutside)

        // clean up function to remove the event listener when the component unmounts or before it re-runs
        return ()=> {
        document.removeEventListener("mousedown", handleClickOutside)
        }
    })

    // formik for form validation
    const formik = useFormik({
        initialValues: {
            title: '',
            desc:''
        },
        validationSchema: Yup.object({
            title: Yup.string()
            .required("Required")
            .min(1)
        }),
        onSubmit: async values => {
             // form submission is handled here
             const data_to_post = {
                title: values.title,
                "list_id": list_id,
                desc: ''
            }

                     //  try to post the data to the endpoint
                     try {
                        const response = await fetch('http://localhost:8000/list_card', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data_to_post)
                        });
                        const data = await response.json();
                        if (data) {
                            router.refresh()
                            values.title=""
                        }
        
                    } catch (error) {
                        console.log("Card couldn't be created in the list");
                        console.error(error);
                    }
        }
    })
    return (
        <form
        onSubmit={formik.handleSubmit}
        ref={formRef}
        className="flex flex-col gap-2 "
        >
        <input
        className="h-16 w-full bg-zinc-800 pb-2 px-2 rounded-lg"
        type="text"
        id="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Enter a title for this card"
        >
        </input>
            <div className="flex items-center gap-2 ">
                <button type="submit" className="h-fit bg-blue-500 text-sm text-black font-semibold rounded hover:bg-blue-400 p-2 ">Add Card</button>
                {/* button to close the button */}
                <div 
                onClick={()=>{setIsFormActive(false)}}
                className="text-gray-200 text-2xl hover:bg-gray-500 hover:bg-opacity-50 p-2 rounded-md "><RxCross2/></div>
            </div>
        </form>
    )
}