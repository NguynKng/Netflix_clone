import { Route, Routes } from "react-router-dom"
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import WatchPage from "./pages/WatchPage"
import SearchPage from "./pages/SearchPage"
import Footer from "./components/Footer"
import { Toaster } from "react-hot-toast"
import AuthRoute from "./routes/AuthRoute"
import PrivateRoute from "./routes/PrivateRoute"
import NotFoundPage from "./pages/404Page"

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<AuthRoute element={<LoginPage />}/>} />
                <Route path="/signup" element={<AuthRoute element={<SignupPage />} />} />
                <Route path="/watch/:id" element={<PrivateRoute element={<WatchPage />} />} />
                <Route path="/search" element={<PrivateRoute element={<SearchPage />} />} />
                <Route path="/*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
            <Toaster />
        </>
    )
}

export default App
