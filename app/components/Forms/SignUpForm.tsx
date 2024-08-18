"use client"
import {useFormik} from "formik"
import Link from "next/link";
import { toast } from "react-toastify";
import * as Yup from "yup"

// Login Form

export default function SignUpForm(){

    // for form validation
    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: ''
        },
        validationSchema : Yup.object({
            email: Yup.string().required('Please enter a valid email').email("Please enter a valid email"),
            username: Yup.string().required("Please enter username").min(4,"Must be at least 4 characters"),
            password: Yup.string().required("Please enter password").min(4,"Must be at least 4 characters")
        }),
        onSubmit: async values => {
            const signupDetails = {
                username: values.username,
                password: values.password,
                email: values.email
              }
     
            try{
                const response = await fetch('http://localhost:8000/users', {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(signupDetails)
                });

                if (!response.ok) {
                    throw new Error('Signup failed');
                  }
          
                  const data = await response.json();
                  toast.success("Account created. You can now login")
                  console.log("User created")
                  window.location.href = '/login'; // Redirect to protected page
                  
            }
            catch (error){
                console.log("Couldnt sign up")
                toast.error("Failed to create account")
                console.error(error)
            }


        }
    }) 

    return (
        <form 
        className=" flex flex-col p-4  md:w-2/4 rounded-md gap-2"
        onSubmit={formik.handleSubmit}>
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <div className="flex flex-col gap-1">
                <label
                className="text-sm text-gray-400"
                >Email</label>
                <input type="text" id="email"
                className="border-gray-300 border-solid border rounded-md p-2"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Enter your email..."
                />
                {(formik.touched.email && formik.errors.email) && <p className="text-red-600 text-xs">{formik.errors.email}</p>}
            </div>

            <div className="flex flex-col gap-1">
                <label
                className="text-sm text-gray-400"
                >Username</label>
                <input type="text" id="username"
                className="border-gray-300 border-solid border rounded-md p-2"
                value={formik.values.username}
                onChange={formik.handleChange}
                placeholder="Enter your username..."
                />
                {(formik.touched.username && formik.errors.username) && <p className="text-red-600 text-xs">{formik.errors.username}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">Password</label>
                <input type="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className="border-gray-300 border-solid border  rounded-md p-2"
                placeholder="Enter your password..."
                />

                {(formik.touched.password && formik.errors.password) && <p className="text-red-600  text-xs">{formik.errors.password}</p>}
            </div>
            <div className="text-sm flex justify-end gap-2">
                Already have an account?  <Link href="/login" className="font-bold"> Sign In </Link>
            </div>
            <button type="submit" className="w-full mt-2 bg-zinc-800 rounded hover:bg-zinc-600 p-2 text-white ">Sign Up</button>
        </form>
    )
}