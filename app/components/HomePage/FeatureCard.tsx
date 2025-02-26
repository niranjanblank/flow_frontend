"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export function FeatureCard({ screenshot, title, subtitle, left }: { screenshot: string; title: string; subtitle: string; left: boolean }) {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl items-center mb-12 text-white`}>
            {/* Conditionally Render Image First or Text First */}
            {left ? (
                <>
                    {/* Image Section */}
                    <motion.div
    
                        initial={{ opacity: 0, x: -50 }} // Image moves in from left
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <Image
                            src={screenshot}
                            alt={title}
                            width={500}
                            height={300}
                            className="rounded-lg shadow-lg object-cover border-2"
                        />
                    </motion.div>

                    {/* Text Section with Opposite Animation */}
                    <motion.div
                        className="text-left"
                        initial={{ opacity: 0, x: 50 }} // Moves in from right (opposite of image)
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <h4 className="text-xl font-semibold mb-2">{title}</h4>
                        <p className="text-zinc-400">{subtitle}</p>
                    </motion.div>
                </>
            ) : (
                <>
                    {/* Text Section with Opposite Animation */}
                    <motion.div
                        className="text-left"
                        initial={{ opacity: 0, x: -50 }} // Moves in from left (opposite of image)
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <h4 className="text-xl font-semibold mb-2">{title}</h4>
                        <p className="text-zinc-400">{subtitle}</p>
                    </motion.div>

                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }} // Image moves in from right
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <Image
                            src={screenshot}
                            alt={title}
                            width={500}
                            height={300}
                            className="rounded-lg shadow-lg object-cover border-2"
                        />
                    </motion.div>
                </>
            )}
        </div>
    );
}
