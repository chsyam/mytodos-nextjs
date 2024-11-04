import { ListTodo } from 'lucide-react';
import Link from 'next/link';
import styles from '@/styles/Auth.module.css';

export default function Register() {
    return (
        <div className={styles.container}>
            <div className={styles.formCard}>
                <div className={styles.logo}>
                    <ListTodo />
                </div>
                <h2>Create your account</h2>

                <form className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>First name</label>
                        <input type="text" placeholder="John" />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Last name</label>
                        <input type="text" placeholder="Doe" />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Username</label>
                        <input type="text" placeholder="username" />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Email address</label>
                        <input type="email" placeholder="john@example.com" />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Password</label>
                        <input type="password" placeholder="Create a strong password" />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Password</label>
                        <input type="password" placeholder="Retype password to confirm" />
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