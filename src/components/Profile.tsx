import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';

export default function Profile() {
    const { user, fetchUser } = useUser();
    const { logout, userId } = useAuth();

    useEffect(() => {
        fetchUser(userId);
    }, []);

    return (
        <div>
            <h1>Profile</h1>
            <p>First name: {user?.firstName}</p>
            <p>Last name: {user?.lastName}</p>
            <p>Email: {user?.email}</p>
            <p>City: {user?.address.city}</p>
            <p>Gender: {user?.gender}</p>
            <p>Phone: {user?.phone}</p>
            <button>Edit</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
}
