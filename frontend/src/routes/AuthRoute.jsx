import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authUser';
import { useEffect } from 'react';

const AuthRoute = ({ element }) => {
    const { user, isCheckingAuth, authCheck } = useAuthStore();

    useEffect(() => {
        authCheck(); // check authentication status when component mounts
    }, [authCheck]);

    // If still checking authentication, show a loading screen
    if (isCheckingAuth) {
        return <div>Loading...</div>;
    }
    
    // If not authenticated, render the login/signup page
    return !user ? element : <Navigate to="/" />
};

export default AuthRoute;