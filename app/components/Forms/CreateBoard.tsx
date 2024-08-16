"use client"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/navigation"
import { BoardBackgroundSelector } from "../Board/BoardBackGroundSelector"
import Popover from "../Dialogs/Popover"
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useEffect, useState } from "react"

export default function  CreateBoard({user_id, template_images}:{user_id:number, template_images: string[]}){
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            title: '',
            description: ''
        },
        validationSchema: Yup.object({
            title: Yup.string()
            .required("Required")
            .min(4, "Must be at least 4 Characters"),
            description: Yup.string()
        }),
        onSubmit: async values => {
            // Handle form submission here
            const data_to_post = {
                title: values.title,
                "description": values.description,
                "owner_id": user_id,
                "background_image_url": backgroundImage
            }
            try {

                const response = await fetch('http://localhost:8000/boards', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data_to_post),
                    credentials: 'include'
                });
                const data = await response.json();
                if (data) {
                    console.log('inside')
                    router.refresh()
                }

            } catch (error) {
                console.log("Board couldn't be created");
                console.error(error);
            }
        }
    })

    const [backgroundImage, setBackgroundImage] = useState("")

    // use effect to set the backgroundImage
    useEffect(()=>{
        setBackgroundImage(template_images[0])
    },[template_images])

    // background image update handler 
    const onBackgroundSelect = (image_url: string) => {
        setBackgroundImage(image_url)
    }
    

    return (
        <form 
        onSubmit={formik.handleSubmit}
        className="flex flex-col justify-center items-center bg-gray-600 text-white rounded-md w-64 p-4 gap-2 mt-2">
                <h1> Create board</h1>
                <div className="w-full">
                <img
                className="w-full h-[160px] rounded-md object-cover"
                src={backgroundImage}/>

                </div>
                <div className="bg-red mt-2">
                    <label className="text-xs"> Board title * </label>
                    <input type="text" id="title"
                    className="w-full h-6 rounded-sm text-white bg-gray-800 px-2"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    ></input>
                    {(formik.touched.title && formik.errors.title) && <p className="text-red-600 pt-2 text-xs">{formik.errors.title}</p>}
                </div>
                <div className="text-xs">
                    <label>Background Image</label>
                    <div className="grid grid-cols-4 gap-1" >
                        {
                            template_images.map((image,index)=>(
                                <img src={image}
                                key={`backgroundimage-${index}`}
                                onClick={()=>onBackgroundSelect(image)}
                                className="w-full h-[40px] rounded-sm object-cover"
                                />
                            ))
                        }
                        <Popover 
                        content={<BoardBackgroundSelector template_images={template_images}/>}>
                            <button type="button" className="bg-gray-700 hover:bg-gray-800 w-full h-[40px] rounded-sm text-3xl flex justify-center items-center"><HiOutlineDotsHorizontal /></button>
                            </Popover>

                    </div>
                    {/* <Popover content={<BoardBackgroundSelector template_images={template_images}/>}>Background Image</Popover> */}
                    
                </div>
                <div>
                    <label className="text-xs">Description</label>
                    <textarea
                    id="description"
                    className="w-full rounded-sm text-white bg-gray-800 px-2"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    ></textarea>
                </div>
                <button type="submit" className="w-full h-6 bg-green-400 rounded hover:bg-green-600 ">Create</button>
        </form>
    )
}