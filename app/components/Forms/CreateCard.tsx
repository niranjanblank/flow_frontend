"use client"

import { useFormik } from "formik"
import { useRouter } from "next/navigation"
import { RxCross2 } from "react-icons/rx"
import * as Yup from "yup"

// form to create card inside the list

export default function CreateCard({list_id}:{list_id:number}){

    // router to  refresh the path when new card is added
    const router = useRouter()

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
                            console.log('Card created in the list')
                            console.log(data)
                            router.refresh()
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
        >
        <input
        className="h-16 w-full bg-zinc-800 pb-2 px-2 rounded-lg"
        type="text"
        id="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Enter card title..."
        >
        </input>
        <div className="flex items-center gap-2">
            <button type="submit" className="h-fit bg-blue-500 text-sm text-black font-semibold rounded hover:bg-blue-400 p-2 ">Add Card</button>
            {/* button to close the button */}
            <div className="text-gray-200 text-2xl hover:bg-gray-500 hover:bg-opacity-50 p-2 rounded-md "><RxCross2/></div>
        </div>
        </form>
    )
}