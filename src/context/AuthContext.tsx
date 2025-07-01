import axios from 'axios';
import { createContext, useContext, useState, type ReactNode } from 'react';

type AuthContextType = {
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    userId: number | null;
};

interface Response {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    accessToken: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);

    async function login(username: string, password: string) {
        const { data } = await axios.post<Response>(
            'https://dummyjson.com/auth/login',
            {
                username,
                password,
            }
        );

        setToken(data.accessToken);
        setUserId(data.id);
    }

    function logout() {
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ token, login, logout, userId }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
