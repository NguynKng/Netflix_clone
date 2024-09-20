import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

const AuthScreen = () => {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/signup?email=${email}`)
    }

    return (
        <>
            <div className="hero-bg lg:h-screen">
                <header className="max-w-6xl mx-auto flex items-center justify-between p-4 pb-10">
                    <Link to='/'>
                        <img src="/netflix-logo.png" alt="Netflix Logo" className="w-32 md:w-40" />
                    </Link>
                    <Link to="/login" className="text-white bg-red-600 py-1 px-3 rounded">
                        Sign In
                    </Link>
                </header>

                <div className="flex flex-col items-center justify-center text-center py-20 px-3 max-w-md md:max-w-3xl mx-auto gap-6 text-white">
                    <h1 className='text-4xl md:text-6xl font-bold'>
                        Unlimited movies, TV shows, and more
                    </h1>
                    <p className="text-xl font-bold">
                        Starts at 70,000 ₫. Cancel anytime.
                    </p>
                    <p className="text-lg">
                        Ready to watch? Enter your email to create or restart your membership.
                    </p>
                    <form className="flex flex-col justify-between sm:flex-row gap-4 w-full md:w-5/6" onSubmit={handleSubmit}>
                        <input className="flex-1 rounded-md px-3 py-4  bg-black/40 border-2 border-gray-600" 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className="flex items-center justify-center p-4 self-center bg-red-600 rounded-md md:text-2xl text-xl font-bold">
                            Get Started
                            <ChevronRight className="ml-2" />
                        </button>
                    </form>
                </div>
            </div>

            {/* Seperator */}
            <div className="h-2 w-full bg-[#232323]" aria-hidden='true' />

            {/* Section 1 */}
            <div className="py-10 bg-black text-white">
                <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                            Enjoy on your TV
                        </h1>
                        <p className="text-lg md:text-xl">
                            Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players, and more
                        </p>
                    </div>
                    <div className="flex-1 relative">
                        <img src="/tv.png" alt="TV image" className="z-20 relative"/>
                        <video 
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                            src='/hero-vid.m4v' 
                            type="video/mp4"
                            playsInline
                            autoPlay={true}
                            muted
                            loop
                        >
                        </video>
                    </div>
                </div>
            </div>

            {/* Seperator */}
            <div className="h-2 w-full bg-[#232323]" aria-hidden='true' />

            {/* Section 2 */}
            <div className="py-10 bg-black text-white">
                <div className="flex md:flex-row flex-col-reverse max-w-6xl mx-auto items-center justify-center px-4 md:px-2">
                    <div className="flex-1">
                        <div className="relative">
                            <img src="/stranger-things-lg.png" alt="Stranger things image" className="mt-4" />
                            <div className="absolute flex items-center gap-2 bottom-5 left-1/2 -translate-x-1/2 bg-black w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md p-2">
                                <img src="/stranger-things-sm.png" alt="image" className="h-full"  />
                                <div className="flex justify-between items-center w-full">
                                    <div className="flex flex-col gap-0">
                                        <span className="text-md lg:text-lg font-bold">Stranger Things</span>
                                        <span className="text-sm text-blue-500">Downloading...</span>
                                    </div>
                                    <img src='/download-icon.gif' alt='' className="h-12" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Download your shows to watch offline</h1>
                        <p className="text-lg md:text-xl">Save your favourites easily and always have something to watch</p>
                    </div>
                </div>
            </div>

            {/* Seperator */}
            <div className="h-2 w-full bg-[#232323]" aria-hidden='true' />

            {/* Section 3 */}
            <div className="py-10 bg-black text-white">
                <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                            Watch everywhere
                        </h1>
                        <p className="text-lg md:text-xl">
                            Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV
                        </p>
                    </div>
                    <div className="flex-1 relative overflow-hidden">
                        <img src="/device-pile.png" alt="Device image" className="z-20 relative"/>
                        <video 
                            className="absolute top-2 left-1/2 -translate-x-1/2 h-4/6 z-10 max-w-[64%]"
                            src='/video-devices.m4v' 
                            type="video/mp4"
                            playsInline
                            autoPlay={true}
                            muted
                            loop
                        >
                        </video>
                    </div>
                </div>
            </div>

            {/* Seperator */}
            <div className="h-2 w-full bg-[#232323]" aria-hidden='true' />

            {/* Section 4 */}
            <div className="py-10 bg-black text-white">
                <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2">
                    <div className="flex-1">
                        <img src="/kids.png" alt="Device image" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                            Create profiles for kids
                        </h1>
                        <p className="text-lg md:text-xl">
                            Send kids on adventures with their favourite characters in a space made just for them - free with your membership
                        </p>
                    </div>
                </div>
            </div>
            </>
    )
}

export default AuthScreen;