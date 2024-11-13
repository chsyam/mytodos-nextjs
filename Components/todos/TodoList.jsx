import { Check, Edit2, Trash2 } from 'lucide-react';
import styles from "./../../styles/todos/TodoList.module.css"
import { useEffect, useState } from 'react';
import { Tooltip } from 'primereact/tooltip';
import { Button } from 'primereact/button';

export default function TodoList({ todos, onComplete, setIsDeleting, setIsUpdating, selectedFilter }) {
    const [filteredTodos, setFilteredTodos] = useState([]);
    useEffect(() => {
        let completedList = [];
        let pendingList = [];
        let overdueList = [];

        todos.map((todo) => {
            if ((todo.status)?.toLowerCase() === 'completed') {
                completedList.push(todo);
            }
            if ((todo.status)?.toLowerCase() === 'pending') {
                pendingList.push(todo);
            }
            if ((todo.status)?.toLowerCase() === 'overdue') {
                overdueList.push(todo);
            }
        })

        if (selectedFilter === 'NA') {
            setFilteredTodos([...overdueList, ...pendingList, ...completedList]);
            return;
        }

        if (selectedFilter === 'completed') {
            setFilteredTodos(completedList);
            return;
        }
        if (selectedFilter === 'pending') {
            setFilteredTodos(pendingList);
            return;
        }
        if (selectedFilter === 'overdue') {
            setFilteredTodos(overdueList);
            return;
        }
    }, [todos, selectedFilter])

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Completed':
                return 'green';
            case 'Pending':
                return 'yellow';
            case 'Overdue':
                return 'red';
            default:
                return 'gray';
        }
    }
    const [buttonTooltip, setButtonTooltip] = useState('Pending');

    return (
        <div className={styles.todoList}>
            {filteredTodos.length === 0 ? "No Todos Found. Try clearing filters." : (
                <table>
                    <tbody>
                        {filteredTodos.map((todo) => (
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
                                        <span style={{ color: 'gray', fontSize: '15px' }}>Due: </span>
                                        <span style={{ color: 'gray', fontSize: '16px' }}>
                                            {new Date(todo.dueDate).toLocaleString()}
                                        </span>
                                    </div>
                                </td>
                                <td style={{ width: '30px' }}>
                                    <Button
                                        type="button"
                                        icon="pi pi-check"
                                        tooltip={buttonTooltip}
                                        onMouseEnter={() => setButtonTooltip(todo?.status)}
                                        onMouseLeave={() => setButtonTooltip('Pending')}
                                        style={{
                                            border: 'none', borderRadius: '50%', width: '30px', height: '30px', backgroundColor: getStatusStyles(todo?.status)
                                        }}
                                    />
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
            )
            }
        </div >
    );
}