'use client'
import { ChevronDown, ListTodo } from 'lucide-react';
import Link from 'next/link';
import styles from '@/styles/Navbar.module.css';
import { useEffect, useState } from 'react';

export default function Navbar({ isAuthenticated }) {
    const [isOpen, setIsOpen] = useState(false);
    const user = { name: "John Doe", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80" };

    const [isLoggedIn, setIsLoggedIn] = useState({
        status: false,
        user: null
    });

    const logoutHandler = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.reload();
    }

    useEffect(() => {
        if (isAuthenticated?.isLogin) {
            setIsLoggedIn({
                status: true,
                user: isAuthenticated?.userData?.username
            });
        } else {
            setIsLoggedIn({
                status: false,
                user: null
            });
        }
    }, [isAuthenticated])

    return (
        <nav className={styles.navbar}>
            <div className={styles.content}>
                <Link href="/" className={styles.logo}>
                    <ListTodo />
                    <span>TaskFlow</span>
                </Link>
                <div className={styles.links}>
                    {
                        !isLoggedIn.status &&
                        <Link href="/login" className={styles.loginLink}>
                            Login
                        </Link>
                    }
                    {
                        !isLoggedIn.status && (
                            <Link href="/register" className={styles.registerLink}>
                                Get Started
                            </Link>
                        )
                    }
                    {
                        isLoggedIn.status && (
                            <div className={styles.profilePart}>
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className={styles.profileButton}>
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className={styles.avatar}
                                    />
                                    <span>{isLoggedIn.user}</span>
                                    <ChevronDown
                                        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                        className={styles.dropDownButton}
                                    />
                                </button>

                                {isOpen && (
                                    <div className={styles.profileOptionsList}>
                                        <a href="#profile" className={styles.profileOption}>Profile</a>
                                        <a href="#settings" className={styles.profileOption}>Settings</a>
                                        <a
                                            style={{ color: 'red', fontWeight: '600' }}
                                            onClick={() => logoutHandler()}
                                            className={styles.profileOption}
                                        >Logout</a>
                                    </div>
                                )}
                            </div>
                        )
                    }
                </div>
            </div>
        </nav>
    );
}