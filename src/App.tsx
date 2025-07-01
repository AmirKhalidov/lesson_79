import './App.css';
import { useContext } from 'react';
import AuthForm from './components/AuthForm';
import Header from './components/Header';
import Profile from './components/Profile';
import Settings from './components/Settings';
import { useAuth } from './context/AuthContext';
import { UserProvider } from './context/UserContext';

export default function App() {
    const { token } = useAuth();
    return (
        <div>
            {!token ? (
                <AuthForm />
            ) : (
                <>
                    <UserProvider>
                        <Header />
                        <Profile />
                        <Settings />
                    </UserProvider>
                </>
            )}
        </div>
    );
}
