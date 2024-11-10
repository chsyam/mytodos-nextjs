import { ListTodo } from 'lucide-react';
import Link from 'next/link';
import styles from '@/styles/Auth.module.css';
import { useState } from 'react';

export default function Register() {
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            const response = await fetch('./../api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response === null) {
                // setFormError("Error registering user. Please try again later");
                // setFormSuccess("");
            } else if (response.ok) {
                // setFormError("");
                // setFormSuccess("User registered successfully");
                try {
                    // const googleSheetResponse = await fetch('./../api/users/userToSheets', {
                    //     method: 'POST',
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //     },
                    //     body: JSON.stringify({
                    //         username: formData.username,
                    //         email: formData.email,
                    //         password: data?.hashedPassword,
                    //         userId: data?.userId
                    //     })
                    // })

                    // console.log(googleSheetResponse)
                } catch (error) {
                    console.log("error appending user details to google sheet", error)
                }
                setTimeout(() => {
                    // setFormSuccess("");
                    window.location.replace('/login');
                }, 100);
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    }


    return (
        <div className={styles.container}>
            <div className={styles.formCard}>
                <div className={styles.logo}>
                    <ListTodo />
                </div>
                <h2>Create your account</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>First name</label>
                        <input
                            value={formData.fullName}
                            onChange={handleChange}
                            name='fullName' type="text" placeholder="John Doe" />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Username</label>
                        <input
                            value={formData.username}
                            onChange={handleChange}
                            name='username' type="text" placeholder="username" />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Email address</label>
                        <input
                            value={formData.email}
                            onChange={handleChange}
                            name='email' type="email" placeholder="john@example.com" />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Password</label>
                        <input
                            value={formData.password}
                            onChange={handleChange}
                            name='password' type="password" placeholder="Create a strong password" />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Password</label>
                        <input
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            name='confirmPassword' type="password" placeholder="Retype password to confirm" />
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        Create account
                    </button>
                </form>
                <p className={styles.switchText}>
                    Already have an account?{' '}
                    <Link href="/login">Sign in</Link>
                </p>
                <Link href="/" className={styles.backLink}>
                    Back to home
                </Link>
            </div>
        </div>
    )
}