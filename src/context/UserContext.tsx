import axios from 'axios';
import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from 'react';

type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    image: string;
    phone: string;
    address: {
        city: string;
        postalCode: string;
    };
};

type UserContextType = {
    user: User | null;
    updateUser: (data: Partial<User>) => void;
    isLoading: boolean;
    error: string | null;
    fetchUser: (userId: number | null) => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function fetchUser(userId: number | null) {
        if (userId === null) {
            setUser(null);
            return;
        }
        setIsLoading(true);
        setError(null);
    
        try {
            const response = await axios.get(
                `https://dummyjson.com/users/${userId}`
            );
            setUser(response.data);
        } catch (err) {
            setError('Failed to fetch user data');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    function updateUser(data: Partial<User>) {
        setUser((currentUser) => {
            if (!currentUser) return data as User;
            return { ...currentUser, ...data };
        });
    }

    return (
        <UserContext.Provider
            value={{ user, updateUser, isLoading, error, fetchUser }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
