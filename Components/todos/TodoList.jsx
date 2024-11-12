import { Check, Edit2, Trash2 } from 'lucide-react';
import styles from "./../../styles/todos/TodoList.module.css"

export default function TodoList({ todos, onComplete, setIsDeleting, isUpdating, setIsUpdating }) {
    return (
        <div className={styles.todoList}>
            <table>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.todoObjId} className={styles.todoItem}>
                            <td className={styles.checkBox}>
                                <button
                                    onClick={() => onComplete(todo.todoObjId, todo)}
                                    className={styles.actionButton}
                                    style={{
                                        backgroundColor: todo.status === "Completed" ? 'green' : 'white',
                                        color: todo.status === "Completed" ? 'white' : 'black'
                                    }}
                                >
                                    <Check />
                                </button>
                            </td>
                            <td className={styles.todoContent}>
                                <div className={styles.todoTitle}
                                    style={{
                                        textDecoration: todo.status === "Completed" ? 'line-through' : 'none'
                                    }}
                                >
                                    {todo.title}
                                </div>
                                <div className={styles.todoDescription}
                                    style={{
                                        textDecoration: todo.status === "Completed" ? 'line-through' : 'none'
                                    }}
                                >
                                    {todo.description}
                                </div>
                                <div className={styles.todoDue}>
                                    <span style={{ color: 'gray' }}>Due: </span>
                                    {new Date(todo.dueDate).toLocaleString()}
                                </div>
                            </td>
                            <td>
                                <div className={styles.todoActions}>
                                    <button
                                        onClick={() => {
                                            setIsUpdating({
                                                status: true,
                                                todoItem: todo
                                            })
                                        }}
                                        className={styles.editAction}
                                    >
                                        <Edit2 />
                                    </button>
                                    <button
                                        onClick={() => setIsDeleting({
                                            status: true,
                                            id: todo.todoObjId
                                        })}
                                        className={styles.deleteAction}
                                    >
                                        <Trash2 />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}