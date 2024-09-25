import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="py-6 md:px-8 md:py-0 bg-black text-gray-400 border-t border-gray-800">
            <div className="flex flex-col gap-16 max-w-6xl mx-auto p-10 md:p-3 mt-20 min-h-96">
                <Link to="#" className="underline">Question? Contact us</Link>
                <div className="flex flex-wrap gap-20 sm:gap-40 underline">
                    <div className="flex flex-col gap-3">
                        <Link to="#">FAQ</Link>
                        <Link to="#">Investor Relations</Link>
                        <Link to="#">Privacy</Link>
                        <Link to="#">Speed Test</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Link to="#">Help Center</Link>
                        <Link to="#">Jobs</Link>
                        <Link to="#">Cookie Preferences</Link>
                        <Link to="#">Legal Notices</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Link to="#">Account</Link>
                        <Link to="#">Ways to Watch</Link>
                        <Link to="#">Corporate Information</Link>
                        <Link to="#">Only on Netflix</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Link to="#">Media Center</Link>
                        <Link to="#">Terms of Use</Link>
                        <Link to="#">Contact Us</Link>
                    </div>
                </div>
                <select className="max-w-40 px-3 py-2 bg-black text-white border rounded-md border-gray-700 focus:border-white focus:border-2">
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