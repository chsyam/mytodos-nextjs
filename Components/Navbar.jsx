import { ListTodo } from 'lucide-react';
import Link from 'next/link';
import styles from '@/styles/Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.content}>
                <Link href="/" className={styles.logo}>
                    <ListTodo />
                    <span>TaskFlow</span>
                </Link>
                <div className={styles.links}>
                    <Link href="/login" className={styles.loginLink}>
                        Login
                    </Link>
                    <Link href="/register" className={styles.registerLink}>
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
}