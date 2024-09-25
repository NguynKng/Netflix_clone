import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authUser'; // assuming you're using a custom hook for auth
import { useEffect } from 'react';

const PrivateRoute = ({ element }) => {
    const { user, isCheckingAuth, authCheck } = useAuthStore();

    useEffect(() => {
        authCheck(); // check authentication status when component mounts
    }, [authCheck]);

    if (isCheckingAuth) {
        return <div>Loading...</div>; // show loading while auth is being checked
    }

    // If user is authenticated, render the component
    return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;