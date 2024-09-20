import { Navigate, Route, Routes } from "react-router-dom"
import { useEffect } from "react"
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Footer from "./components/Footer"
import { Toaster } from "react-hot-toast"
import useAuthStore from "./store/authUser"

function App() {
    const { user, isCheckingAuth, authCheck } = useAuthStore()

    useEffect(() => {
        authCheck()
    }, [authCheck])


    if (isCheckingAuth) 
        return <div>Loading...</div>

    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
                <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to={"/"} />} />
            </Routes>
            <Footer />
            <Toaster />
        </>
    )
}

export default App
