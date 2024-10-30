import { ArrowRight, ListTodo, Users, Zap, LineChart } from 'lucide-react';
import Link from 'next/link';
import styles from './../styles/Home.module.css';
import Navbar from './../Components/Navbar';
import Stats from './../Components/Stats';
import Features from './../Components/Features';

export default function Home() {
	return (
		<div className={styles.container}>
			<Navbar />
			<main className={styles.main}>
				<section className={styles.hero}>
					<h1>Organize your work and life, finally.</h1>
					<p>
						TaskFlow helps you stay organized and manage your day-to-day tasks with ease.
						Join millions of users who trust us for their productivity needs.
					</p>
					<Link href="/register" className={styles.ctaButton}>
						Start for free <ArrowRight className={styles.icon} />
					</Link>
				</section>
				<Stats />
				<Features />
			</main>
		</div>
	);
}