import SignUpForm from "../components/Forms/SignUpForm";


export default function SignUp(){
    return (
        <div className=" grid grid-cols-1 md:grid-cols-2 ">
            {/* for signup form */}
            <div className="flex justify-center items-center md:-mt-40 h-screen">
            <SignUpForm/>
            </div>
            {/* for details */}
            <div className="bg-red-400 h-screen">
                details
            </div>
            </div>
    )
}