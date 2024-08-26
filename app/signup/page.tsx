import Image from "next/image";
import SignUpForm from "../components/Forms/SignUpForm";
import { FaRegCheckCircle, FaTasks, FaRegClock, FaFileAlt, FaMobileAlt } from "react-icons/fa";
import Link from "next/link";

export default function SignUp() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
            {/* for signup form */}
            <div className="flex justify-center items-center md:-mt-40">
                <SignUpForm />
            </div>
            {/* for details */}
            <div className="bg-zinc-800 flex items-center justify-center p-8 text-white">
                <div className="text-center">
      
                    <Image
                        src="/assets/flow_2.png" 
                        alt="Flow Logo" 
                        width={300} 
                        height={120} 
                        className="mx-auto mb-8"
                    />
                    <p className="mb-8 text-lg">Take control of your tasks and boost your productivity with Flow, your personal task management tool designed for simplicity and efficiency.</p>
                    
                    <h3 className="text-2xl font-semibold mb-6">Why Use Flow?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-zinc-700 text-white p-6 rounded-lg shadow-lg flex items-center">
                            <FaTasks className="mr-4 text-4xl text-zinc-400" />
                            <div>
                                <h4 className="font-semibold text-lg">Personalized Workflows</h4>
                                <p>Organize your tasks in a way that suits you best.</p>
                            </div>
                        </div>
                        <div className="bg-zinc-700 text-white p-6 rounded-lg shadow-lg flex items-center">
                            <FaRegCheckCircle className="mr-4 text-4xl text-zinc-400" />
                            <div>
                                <h4 className="font-semibold text-lg">Intuitive Drag-and-Drop</h4>
                                <p>Easily move tasks between lists with our user-friendly interface.</p>
                            </div>
                        </div>
                        <div className="bg-zinc-700 text-white p-6 rounded-lg shadow-lg flex items-center">
                            <FaRegClock className="mr-4 text-4xl text-zinc-400" />
                            <div>
                                <h4 className="font-semibold text-lg">Deadline Tracking</h4>
                                <p>Stay on top of your schedule with due date reminders.</p>
                            </div>
                        </div>
                        <div className="bg-zinc-700 text-white p-6 rounded-lg shadow-lg flex items-center">
                            <FaMobileAlt className="mr-4 text-4xl text-zinc-400" />
                            <div>
                                <h4 className="font-semibold text-lg">Accessible Anywhere</h4>
                                <p>Manage your tasks on the go with our mobile-friendly design.</p>
                            </div>
                        </div>
                    </div>

                    <p className="text-lg mt-8">Already have an account? <Link href="/login" className="underline font-bold">Sign In</Link></p>
                </div>
            </div>
        </div>
    );
}
