import { motion } from "framer-motion";

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.02, boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="bg-blue-50 rounded-lg shadow m-4 dark:bg-gray-800"
        >
            <div className="w-full mx-auto max-w-screen-xl p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-sm text-gray-700 text-center dark:text-gray-300 mb-4 lg:mb-0"
                >
                    © 2024 <a href={"/"} className="hover:underline text-blue-600">Forumly</a>. All Rights Reserved.
                </motion.span>
                <motion.ul
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="flex flex-wrap justify-center lg:justify-end items-center text-sm font-medium text-gray-700 dark:text-gray-300 gap-4 lg:gap-6"
                >
                    <li>
                        <motion.a
                            whileHover={{ scale: 1.1 }}
                            href="#"
                            className="hover:underline text-blue-600"
                        >
                            About
                        </motion.a>
                    </li>

                    <li>
                        <motion.a
                            whileHover={{ scale: 1.1 }}
                            href="/contacts"
                            className="hover:underline text-blue-600"
                        >
                            Contact
                        </motion.a>
                    </li>
                </motion.ul>
            </div>
        </motion.footer>
    );
};

export default Footer;
