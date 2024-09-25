import AuthScreen from './AuthScreen'
import HomeScreen from './HomeScreen'
import useAuthStore from '../../store/authUser'
import { useEffect } from 'react'

const HomePage = () => {
    const { user, authCheck, isCheckingAuth } = useAuthStore()

    useEffect(() => {
        authCheck(); // check authentication status when component mounts
    }, [authCheck]);

    if (isCheckingAuth) {
        return <div>Loading...</div>;
    }
    
    return !user ? <AuthScreen /> : <HomeScreen />;
}

export default HomePage;