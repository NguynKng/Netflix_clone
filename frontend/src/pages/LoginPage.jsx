import { Link } from "react-router-dom"
import { useState } from "react"
import useAuthStore from "../store/authUser"

const LoginPage = () => {
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const { login } = useAuthStore()

    const handleLogin = async (e) => {
        e.preventDefault()
        login({email, password})
    }

    return (
        <div className="h-screen w-full hero-bg">
            <header className="max-w-6xl mx-auto flex justify-between items-center p-4">
                <Link to='/'>
                    <img src='/netflix-logo.png' alt="logo" className="w-40" />
                </Link>
            </header>
            <div className="flex justify-center items-center">
                <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
                    <h1 className="text-center text-white text-3xl font-bold mb-4">Sign In</h1>
                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div className="relative w-full">
                            <input 
                                className="peer w-full px-3 py-4 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                                type="email" 
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                            <label htmlFor="email" className={`absolute left-3 transition-all duration-300 text-md font-medium text-gray-400  ${email ? 'text-xs top-1.5' : 'top-5 peer-focus:text-xs peer-focus:top-1.5'}`}>Email</label>
                        </div>
                        <div className="relative w-full">
                            <input 
                                className="peer w-full px-3 py-4 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                                type="password" 
                                id="password" 
                                name="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                            <label htmlFor="password" className={`absolute left-3 transition-all duration-300 text-md font-medium text-gray-400  ${password ? 'text-xs top-1.5' : 'top-5 peer-focus:text-xs peer-focus:top-1.5'}`}>Password</label>
                        </div>
                        {/*{message && (
                            <div className="w-full text-red-500 text-sm flex gap-1">
                                <CircleX />
                                {message}
                            </div>
                        )}*/}
                        <button className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md">
                            Login
                        </button>
                    </form>
                    <div className="text-center text-gray-400">
                        {`Don't have an account? `}
                        <Link to='/signup' className="text-red-500 hover:underline">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;