"use client"
import { useFormik } from "formik"
import * as Yup from "yup"

export default function CreateBoard(){

    const formik = useFormik({
        initialValues: {
            title: ''
        },
        validationSchema: Yup.object({
            title: Yup.string()
            .required("Required")
            .min(4, "Must be at least 4 Characters")
        }),
        onSubmit: values => {
            // Handle form submission here
            console.log(values);
        }
    })

    return (
        <form 
        onSubmit={formik.handleSubmit}
        className="flex flex-col justify-center items-center bg-gray-600 text-white rounded-md w-64 p-4 gap-2">
                <h1> Create board</h1>
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
                <button type="submit" className="w-full h-6 bg-green-400 rounded hover:bg-green-600 ">Create</button>
        </form>
    )
}