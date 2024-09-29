import AuthScreen from './AuthScreen'
import HomeScreen from './HomeScreen'
import useAuthStore from '../../store/authUser'

const HomePage = () => {
    const { user } = useAuthStore();
    
    return user ? <HomeScreen /> : <AuthScreen /> // Show HomeScreen if valid token is found
}

export default HomePage;