import { useState } from "react"
import { Link } from "react-router-dom"

const Footer = () => {
    const [language, setLanguage] = useState()
    return (
        <footer className="py-6 md:px-8 md:py-0 bg-black text-gray-400 border-t border-gray-800">
            <div className="flex flex-col gap-16 max-w-6xl mx-auto p-10 md:p-3 mt-20 min-h-96">
                <Link to="#" className="hover:underline hover:text-white">Question? Contact us</Link>
                <div className="flex flex-wrap gap-20 sm:gap-40">
                    <div className="flex flex-col gap-3">
                        <Link to="#" className="hover:underline hover:text-white">FAQ</Link>
                        <Link to="#" className="hover:underline hover:text-white">Investor Relations</Link>
                        <Link to="#" className="hover:underline hover:text-white">Privacy</Link>
                        <Link to="#" className="hover:underline hover:text-white">Speed Test</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Link to="#" className="hover:underline hover:text-white">Help Center</Link>
                        <Link to="#" className="hover:underline hover:text-white">Jobs</Link>
                        <Link to="#" className="hover:underline hover:text-white">Cookie Preferences</Link>
                        <Link to="#" className="hover:underline hover:text-white">Legal Notices</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Link to="#" className="hover:underline hover:text-white">Account</Link>
                        <Link to="#" className="hover:underline hover:text-white">Ways to Watch</Link>
                        <Link to="#" className="hover:underline hover:text-white">Corporate Information</Link>
                        <Link to="#" className="hover:underline hover:text-white">Only on Netflix</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Link to="#" className="hover:underline hover:text-white">Media Center</Link>
                        <Link to="#" className="hover:underline hover:text-white" >Terms of Use</Link>
                        <Link to="#" className="hover:underline hover:text-white">Contact Us</Link>
                    </div>
                </div>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="max-w-40 px-3 py-2 bg-black text-white border rounded-md border-gray-700">
                    <option value="vi" className="bg-white text-black">Tiếng Việt</option>
                    <option value="en" className="bg-white text-black">English</option>
                </select>
                <p>Netflix VietNam</p>
                <p className="text-sm text-gray-400">
                    © 2022 Netflix, Inc. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer