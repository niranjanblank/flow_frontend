"use client";

export default function Footer() {
    return (
        <footer className="bg-zinc-900 text-white py-10 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Branding and Tagline */}
                <div>
                    <h2 className="text-2xl font-bold">Flow</h2>
                    <p className="text-zinc-400 text-sm mt-2">For those who create.</p>
                    <a href="https://github.com/niranjanblank/flow_frontend" target="_blank" className="text-zinc-400 hover:text-white transition">GitHub</a>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col space-y-3">
                    <h4 className="text-lg font-semibold">Features</h4>
                    <a href="#features" className="text-zinc-400 hover:text-white transition">Task Management</a>
                    <a href="#features" className="text-zinc-400 hover:text-white transition">Boards & Lists</a>
                </div>

                <div className="flex flex-col space-y-3">
                    <h4 className="text-lg font-semibold">Resources</h4>
                    <a href="https://github.com/niranjanblank/flow_frontend"  target="_blank" className="text-zinc-400 hover:text-white transition">Documentation</a>
                    <a href="https://github.com/niranjanblank/flow_frontend" target="_blank" className="text-zinc-400 hover:text-white transition">API Reference</a>
                    <a href="https://github.com/niranjanblank/flow_frontend" target="_blank" className="text-zinc-400 hover:text-white transition">Support</a>
                </div>
            </div>

            {/* Copyright and Attribution */}
            <div className="text-center text-zinc-500 text-sm mt-10">
                © {new Date().getFullYear()} Flow. All rights reserved.
            </div>
        </footer>
    );
}
