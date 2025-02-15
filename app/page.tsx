import Image from "next/image";
import Link from "next/link";
import { FaTasks, FaRegCheckCircle, FaMobileAlt } from "react-icons/fa";

export default function Home() {
    return (
        <>
        <main className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white p-8">
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
        
        <div className="flex flex-col items-center justify-center min-h-screen gap-2 mb-40 ">
            {/* Screenshot Showcase */}
            <h3 className="text-2xl font-semibold mt-16 mb-6 text-center">See Flow in Action</h3>
            <p className="text-lg mb-8 text-center max-w-2xl">
                Get a sneak peek of Flow’s intuitive task management interface with real-world examples.
            </p>

            {/* Screenshot & Feature Description - Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl items-center mb-12">
                <Image
                    src="/assets/screenshots/1.png"
                    alt="Flow Board Example"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-lg object-cover border-2"
                />
                <div className="text-left">
                    <h4 className="text-xl font-semibold mb-2">Task Boards</h4>
                    <p className="text-zinc-400">
                        Manage your tasks with an easy-to-use board view. Create, move, and organize tasks efficiently.
                    </p>
                </div>
            </div>

            {/* Screenshot & Feature Description - Row 2 (Reversed) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl items-center mb-12">
                <div className="text-left">
                    <h4 className="text-xl font-semibold mb-2">Task Table Overview</h4>
                    <p className="text-zinc-400">
                        View your tasks in a table format, categorized by status, priority, and deadlines.
                    </p>
                </div>
                <Image
                    src="/assets/screenshots/2.png"
                    alt="Task Management Table View"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-lg object-cover border-2"
                />
            </div>

            {/* Screenshot & Feature Description - Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl items-center mb-12">
                <Image
                    src="/assets/screenshots/4.png"
                    alt="User Profile and Settings"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-lg object-cover border-2"
                />
                <div className="text-left">
                    <h4 className="text-xl font-semibold mb-2">User Profile & Settings</h4>
                    <p className="text-zinc-400">
                        Customize your profile, manage preferences, and update account details seamlessly.
                    </p>
                </div>
            </div>

            {/* Screenshot & Feature Description - Row 4 (Reversed) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl items-center mb-12">
                <div className="text-left">
                    <h4 className="text-xl font-semibold mb-2">Dashboard & Board Overview</h4>
                    <p className="text-zinc-400">
                        Get a quick summary of all your boards, tasks, and progress at a glance.
                    </p>
                </div>
                <Image
                    src="/assets/screenshots/3.png"
                    alt="Dashboard and Boards Overview"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-lg object-cover border-2"
                />
            </div>

            {/* Screenshot & Feature Description - Row 5 (Drag and Drop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl items-center">
                <Image
                    src="/assets/screenshots/5.png"
                    alt="Drag and Drop Feature"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-lg object-cover border-2"
                />
                <div className="text-left">
                    <h4 className="text-xl font-semibold mb-2">Drag & Drop Tasks</h4>
                    <p className="text-zinc-400">
                        Effortlessly rearrange your tasks with a simple drag-and-drop feature, making workflow management smoother than ever.
                    </p>
                </div>
            </div>

            </div>
        </>
    );
}
