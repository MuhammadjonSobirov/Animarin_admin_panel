import { useState } from 'react';
import useStore from '../../zustand/store';
import { useNavigate } from 'react-router-dom';
import { BiHide, BiShow } from "react-icons/bi";

const LoginPage = () => {
    const { login, toggleLogin } = useStore();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name === 'Madara' && password === 'ZxCv1qw2') {
            toggleLogin();
            navigate('/');
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <div className="bg-gray-100 flex justify-center items-center min-h-screen px-4">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm sm:max-w-md lg:max-w-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"} // Ko'rinishni boshqarish
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 bg-gray-100 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Enter your password"
                            required
                        />
                        {/* Ko'rinishni boshqarish tugmasi */}
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute top-[35px] right-4  text-gray-600 hover:text-blue-500 focus:outline-none"
                        >
                            {showPassword ? <BiHide style={{ fontSize: '1.2rem' }} /> : <BiShow style={{ fontSize: '1.2rem' }} />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 focus:outline-none"
                    >
                        {login ? 'Logout' : 'Login'}
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600 mt-4">
                    Don't have an account? <a href="#" className="text-blue-500 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
