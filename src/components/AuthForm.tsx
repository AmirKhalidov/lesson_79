import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';

interface FormData {
    username: string;
    password: string;
}

export default function AuthForm() {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        password: '',
    });

    const { login } = useAuth();

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target as { name: string; value: unknown };
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            await login(formData.username, formData.password);
        } catch (error) {
            console.error('Login failed:', error);
        }
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    name="username"
                    type="text"
                    id="username"
                    value={formData.username}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    name="password"
                    type="text"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}
