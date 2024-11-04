import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import styles from "./../styles/TodoStats.module.css";

export default function TodoStats() {
    const completed = 10;
    const pending = 20;
    const overdue = 30;

    return (
        <div className={styles.todoStats}>
            <div className={styles.statCard}>
                <div className={styles.cardContent}>
                    <div className={styles.icon} style={{ backgroundColor: 'rgba(209, 250, 229)' }}>
                        <CheckCircle style={{ height: '35px', width: '35px', color: 'green' }} />
                    </div>
                    <div>
                        <p className={styles.status}>Completed</p>
                        <p className={styles.count}>{completed}</p>
                    </div>
                </div>
            </div>

            <div className={styles.statCard}>
                <div className={styles.cardContent}>
                    <div className={styles.icon} style={{ backgroundColor: 'rgb(219 234 254)' }}>
                        <Clock style={{ height: '30px', width: '30px', color: 'blue' }} />
                    </div>
                    <div>
                        <p className={styles.status}>Pending</p>
                        <p className={styles.count}>{pending}</p>
                    </div>
                </div>
            </div>

            <div className={styles.statCard}>
                <div className={styles.cardContent}>
                    <div className={styles.icon} style={{ backgroundColor: 'rgb(254 226 226)' }}>
                        <AlertCircle style={{ height: '30px', width: '30px', color: 'red' }} />
                    </div>
                    <div>
                        <p className={styles.status}>Overdue</p>
                        <p className={styles.count}>{overdue}</p>
                    </div>
                </div>
            </div>
        </div >
    );
}