"use client"
import {useFormik} from "formik"
import * as Yup from "yup"

export default function LoginForm(){

    // for form validation
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema : Yup.object({
            username: Yup.string().required("Required").min(4,"Must be at least 4 characters"),
            password: Yup.string().required("Required").min(4,"Must be at least 4 characters")
        }),
        onSubmit: async values => {
            const loginDetails = new URLSearchParams({
                username: values.username,
                password: values.password
              }).toString();
            console.log("login_details", loginDetails)
            try{
                const response = await fetch('http://localhost:8000/token', {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: loginDetails
                });

                const data = await response.json();
                if (data){
                    console.log("Token received", data);
                    // Save the token to local storage
                    localStorage.setItem('access_token', data.access_token);
                }
            }
            catch (error){
                console.log("Couldnt verify credentials")
                console.error(error)
            }


        }
    }) 

    return (
        <form 
        className="bg-zinc-800 flex flex-col p-4  w-64 rounded-md gap-2"
        onSubmit={formik.handleSubmit}>
            <label>Username</label>
            <input type="text" id="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            />
            <label>Password</label>
            <input type="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            />
                <button type="submit" className="w-full h-6 bg-green-400 rounded hover:bg-green-600 ">Login</button>
        </form>
    )
}