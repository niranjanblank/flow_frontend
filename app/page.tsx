import Image from "next/image";
import Link from "next/link";
import { FaTasks, FaRegCheckCircle, FaMobileAlt } from "react-icons/fa";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center h-screen bg-zinc-900 text-white p-8">
            {/* Logo */}
            <Image
                src="/assets/flow_2.png"
                alt="Flow Logo"
                width={300}
                height={120}
                className="mb-8"
            />

            {/* Catchphrase */}
            <p className="text-2xl mb-8 font-light">For those who create, Flow empowers your workflow.</p>

            {/* Features section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                <div className="bg-zinc-800 p-6 rounded-lg shadow-lg text-center">
                    <FaTasks className="text-4xl text-zinc-400 mb-4 mx-auto" />
                    <h2 className="text-xl font-semibold mb-2">Streamlined Task Management</h2>
                    <p className="text-zinc-400">Organize your tasks efficiently with our intuitive interface.</p>
                </div>
                <div className="bg-zinc-800 p-6 rounded-lg shadow-lg text-center">
                    <FaRegCheckCircle className="text-4xl text-zinc-400 mb-4 mx-auto" />
                    <h2 className="text-xl font-semibold mb-2">Focus on What Matters</h2>
                    <p className="text-zinc-400">Prioritize your tasks and manage your time effectively.</p>
                </div>
                <div className="bg-zinc-800 p-6 rounded-lg shadow-lg text-center">
                    <FaMobileAlt className="text-4xl text-zinc-400 mb-4 mx-auto" />
                    <h2 className="text-xl font-semibold mb-2">Accessible Anytime, Anywhere</h2>
                    <p className="text-zinc-400">Stay productive on the go with our mobile-friendly design.</p>
                </div>
            </div>

            {/* Call to action */}
            <div className="mt-12">
                <Link
                    href="/signup"
                    className="bg-zinc-700 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-zinc-600 transition duration-300"
                >
                    Get Started with Flow
                </Link>
            </div>
        </main>
    );
}
