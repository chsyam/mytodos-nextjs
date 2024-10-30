import { Zap, Users, LineChart } from 'lucide-react';
import styles from './../styles/Features.module.css';

export default function Features() {
    return (
        <section className={styles.features}>
            <h2>Why choose TaskFlow?</h2>
            <div className={styles.grid}>
                <div className={styles.feature}>
                    <Zap className={styles.icon} />
                    <h3>Lightning Fast</h3>
                    <p>Instantly sync across all your devices with real-time updates.</p>
                </div>
                <div className={styles.feature}>
                    <Users className={styles.icon} />
                    <h3>Team Collaboration</h3>
                    <p>Share tasks and collaborate with team members seamlessly.</p>
                </div>
                <div className={styles.feature}>
                    <LineChart className={styles.icon} />
                    <h3>Insights & Analytics</h3>
                    <p>Track your productivity with detailed analytics and reports.</p>
                </div>
            </div>
        </section>
    );
}