import { useState, useEffect } from 'react';
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { Link } from 'react-router-dom';
import useStore from '../zustand/store';


const Navbar = () => {
    const { login, toggleLogin } = useStore();

    // Get initial dark mode setting from localStorage or default to false
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true';
    });
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Toggle dark mode and save preference to localStorage
    const toggleDarkMode = () => {
        setDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem('darkMode', newMode);
            return newMode;
        });
    };

    // Toggle mobile menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Add or remove dark mode classes on mount and darkMode change
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
                <div className="w-40">
                    <img src="/images/logo.svg" alt="logo" />
                </div>
                
                <ul className="hidden md:flex space-x-6">
                    <li>
                        <Link to="/" className="text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500">Home</Link>
                    </li>
                    <li>
                        <Link to="/post" className="text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500">Post</Link>
                    </li>
                </ul>

                <div className="flex items-center space-x-4">
                    <button 
                        onClick={toggleDarkMode} 
                        className="flex items-center text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-lg"
                    >
                        {darkMode ? (
                            <MdOutlineLightMode className="w-6 h-6" />
                        ) : (
                            <MdDarkMode className="w-6 h-6" />
                        )}
                    </button>

                    {/* Login button */}
                    {login ? (
                        <button 
                            onClick={toggleLogin} 
                            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600">
                        Login
                    </Link>
                    )}

                    {/* Mobile menu toggle */}
                    <button 
                        onClick={toggleMenu} 
                        className="md:hidden text-gray-900 dark:text-gray-300 focus:outline-none"
                    >
                        ☰
                    </button>
                </div>
            </div>
            
            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <ul className="flex flex-col space-y-1 mt-2 px-4 py-2 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                        <li>
                            <Link to="/" className="block text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500">Home</Link>
                        </li>
                        <li>
                            <Link to="/post" className="block text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500">Post</Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
