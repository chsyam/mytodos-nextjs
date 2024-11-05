import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import styles from "./../styles/TodoStats.module.css";
import { useEffect, useState } from "react";

export default function TodoStats({ todosList }) {
    const [completedTodos, setCompletedTodos] = useState(0);
    const [pendingTodos, setPendingTodos] = useState(0);
    const [overdueTodos, setOverdueTodos] = useState(0);

    useEffect(() => {
        let x = 0;
        let y = 0;
        let z = 0;

        todosList.forEach((todo) => {
            if (todo.status === 'Completed') {
                x++;
            } else if (todo.status === 'Pending') {
                y++;
            } else if (todo.status === 'Overdue') {
                z++;
            }
        });

        setCompletedTodos(x);
        setPendingTodos(y);
        setOverdueTodos(z);
    }, [todosList])

    return (
        <div className={styles.todoStats}>
            <div className={styles.statCard}>
                <div className={styles.cardContent}>
                    <div className={styles.icon} style={{ backgroundColor: 'rgba(209, 250, 229)' }}>
                        <CheckCircle style={{ height: '35px', width: '35px', color: 'green' }} />
                    </div>
                    <div>
                        <p className={styles.status}>Completed</p>
                        <p className={styles.count}>{completedTodos}</p>
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
                        <p className={styles.count}>{pendingTodos}</p>
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
                        <p className={styles.count}>{overdueTodos}</p>
                    </div>
                </div>
            </div>
        </div >
    );
}