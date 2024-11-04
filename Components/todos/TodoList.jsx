import { Check, Edit2, Trash2 } from 'lucide-react';
import styles from "./../../styles/todos/TodoList.module.css"

export default function TodoList({ todos, onComplete, onDelete, onEdit, isDeleting, setIsDeleting }) {
    return (
        <div className={styles.todoList}>
            <table>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.id} className={styles.todoItem}>
                            <td className={styles.checkBox}>
                                <button onClick={() => onComplete(todo.id)} className={styles.actionButton}>
                                    <Check />
                                </button>
                            </td>
                            <td className={styles.todoContent}>
                                <div className={styles.todoTitle}>
                                    {todo.title}
                                </div>
                                <div className={styles.todoDescription}>
                                    {todo.description}
                                </div>
                                <div className={styles.todoDue}>
                                    <span style={{ color: 'gray' }}>Due: </span>{todo.dueDate}
                                </div>
                            </td>
                            <td className={styles.todoActions}>
                                <button onClick={() => onEdit(todo)} className={styles.editAction}>
                                    <Edit2 />
                                </button>
                                <button
                                    onClick={() => setIsDeleting({
                                        status: true,
                                        id: todo.id
                                    })}
                                    className={styles.deleteAction}
                                >
                                    <Trash2 />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}