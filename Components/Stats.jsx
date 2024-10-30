import styles from '@/styles/Stats.module.css';

export default function Stats() {
    return (
        <section className={styles.stats}>
            <div className={styles.container}>
                <div className={styles.stat}>
                    <div className={styles.number}>2M+</div>
                    <div className={styles.label}>Active Users</div>
                </div>
                <div className={styles.stat}>
                    <div className={styles.number}>50M+</div>
                    <div className={styles.label}>Tasks Completed</div>
                </div>
                <div className={styles.stat}>
                    <div className={styles.number}>98%</div>
                    <div className={styles.label}>Customer Satisfaction</div>
                </div>
            </div>
        </section>
    );
}