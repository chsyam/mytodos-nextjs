import { ListTodo } from 'lucide-react';
import Link from 'next/link';
import styles from './../../styles/Auth.module.css';

export default function Login() {
    return (
        <div className={styles.container}>
            <div className={styles.formCard}>
                <div className={styles.logo}>
                    <ListTodo />
                </div>
                <h2>Welcome back</h2>

                <form className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Email address</label>
                        <input type="email" placeholder="Enter your email" />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Password</label>
                        <input type="password" placeholder="Enter your password" />
                    </div>

                    <button type="submit" className={styles.submitButton}>
                        Sign in
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