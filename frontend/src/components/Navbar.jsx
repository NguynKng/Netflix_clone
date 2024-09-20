import { Link } from "react-router-dom";
import { useState } from "react";
import { LogOut, Menu, Search } from "lucide-react";
import useAuthStore from "../store/authUser";
import useContentStore from '../store/content'

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
    const { user, logout } = useAuthStore()
    const { setContentType } = useContentStore()

    return (
        <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">

            {/* Desktop navbar items*/}

            <div className="flex items-center gap-2 sm:gap-10 z-50">
                <div className="sm:hidden">
                    <Menu onClick={toggleMobileMenu} className="size-10"/>
                </div>
                <Link to="/">
                    <img src="/netflix-logo.png" alt="Netflix logo" className="w-32 sm:w-40" />
                </Link>
                <div className="hidden sm:flex gap-5 items-center">
                    <Link to="/" className="hover:underline hover:underline-offset-4">Home</Link>
                    <Link to="/" className="hover:underline hover:underline-offset-4" onClick={() => setContentType("tv")}>TV Shows</Link>
                    <Link to="/" className="hover:underline hover:underline-offset-4" onClick={() => setContentType("movie")}>Movies</Link>
                    <Link to="/" className="hover:underline hover:underline-offset-4">Recently Added</Link>
                    <Link to="/" className="hover:underline hover:underline-offset-4">My List</Link>
                </div>
            </div>
            <div className="flex items-center gap-2 z-50 ">
                <Link to="/search">
                    <Search />
                </Link>
                <img src={user.image} alt="Avatar" className="h-8 rounded cursor-pointer"/>
                <LogOut className="cursor-pointer text-red-500" onClick={logout} />
            </div>

            {/* Mobile navbar items*/}

            {isMobileMenuOpen && (
            <div className="w-full sm:hidden mt-4 z-50 bg-transparent/30 border rounded border-gray-800">
                <Link to="/" className="hover:underline hover:underline-offset-4 block">Home</Link>
                <Link to="/" className="hover:underline hover:underline-offset-4 block" onClick={() => setContentType("TV")}>TV Shows</Link>
                <Link to="/" className="hover:underline hover:underline-offset-4 block" onClick={() => setContentType("Movie")}>Movies</Link>
                <Link to="/" className="hover:underline hover:underline-offset-4 block">Recently added</Link>
                <Link to="/" className="hover:underline hover:underline-offset-4 block">My List</Link>
            </div>
            )}
        </header>
    )
}

export default Navbar;