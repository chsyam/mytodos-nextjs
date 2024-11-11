import { ListTodo } from 'lucide-react';
import Link from 'next/link';
import styles from './../../styles/Auth.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Navbar from '@/Components/Navbar';

export default function Login() {
    const router = useRouter();
    const [loginError, setLoginError] = useState("");
    const [loginSuccess, setLoginSuccess] = useState("");
    const [formData, setFormData] = useState({
        email: "syamkumar6845@gmail.com",
        password: "Syam@190543"
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            console.log(response);
            if (response === null) {
                setLoginSuccess("");
                setLoginError("Invalid Credentials..!");
            }
            else if (response.status === 200) {
                setLoginError("");
                setLoginSuccess("Login successfull");
                const { token } = await response.json()
                document.cookie = `token=${token}; path=/`
                setTimeout(() => {
                    router.push('/dashboard')
                }, 500);
            } else {
                setLoginError("Something went wrong while login. Please try again later");
            }
        } catch (error) {
            setLoginError("Something went wrong while login. Please try again later");
            console.log(error);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.formCard}>
                <div className={styles.logo}>
                    <ListTodo />
                </div>
                <h2>Welcome back</h2>

                <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                    <div className={styles.formGroup}>
                        <label>Email address</label>
                        <input
                            value={formData.email}
                            onChange={(e) => handleChange(e)}
                            name='email' type="email" placeholder="Enter your email" />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Password</label>
                        <input
                            value={formData.password}
                            onChange={(e) => handleChange(e)}
                            name='password' type="password" placeholder="Enter your password" />
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        SignIn
                    </button>
                </form>

                <p className={styles.switchText}>
                    Don't have an account?{' '}
                    <Link href="/register">Sign up</Link>
                </p>

                <Link href="/" className={styles.backLink}>
                    Back to home
                </Link>
            </div>
        </div>
    );
}