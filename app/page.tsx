
import Image from "next/image";
import Link from "next/link";
import { FaTasks, FaRegCheckCircle, FaMobileAlt } from "react-icons/fa";

import { FeatureCard } from "./components/HomePage/FeatureCard";
import Footer from "./components/HomePage/Footer";

const featureData = [
    {
        screenshot: "/assets/screenshots/1.png",
        title: "Task Boards",
        subtitle: "Manage your tasks with an easy-to-use board view. Create, move, and organize tasks efficiently.",
        left: false
    },
    {
        screenshot: "/assets/screenshots/2.png",
        title: "Task Table Overview",
        subtitle: "View your tasks in a table format, categorized by status, priority, and deadlines.",
        left: true
    },
    {
        screenshot: "/assets/screenshots/4.png",
        title: "User Profile & Settings",
        subtitle: "Customize your profile, manage preferences, and update account details seamlessly.",
        left: false
    },
    {
        screenshot: "/assets/screenshots/3.png",
        title: "Dashboard & Board Overview",
        subtitle: "Get a quick summary of all your boards, tasks, and progress at a glance.",
        left: true
    },
    {
        screenshot: "/assets/screenshots/5.png",
        title: "Drag & Drop Tasks",
        subtitle: "Effortlessly rearrange your tasks with a simple drag-and-drop feature, making workflow management smoother than ever.",
        left: false
    }
];

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
        
        <section 
            id="features"
            className="flex flex-col items-center justify-center w-full gap-4 py-4 bg-zinc-800">
                {featureData.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        screenshot={feature.screenshot}
                        title={feature.title}
                        subtitle={feature.subtitle}
                        left={feature.left}
                    />
                ))}
            </section>
        <section >
           <Footer/>
        </section>
        </>
    );
}
