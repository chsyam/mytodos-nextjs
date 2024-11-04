import Navbar from "@/Components/Navbar";
import TodoList from "@/Components/todos/TodoList";
import TodoStats from "@/Components/TodoStats";
import { useState } from "react";
import styles from "./../../styles/todos/TodoList.module.css"
import { Filter, Plus, Trash2, X } from "lucide-react";

export default function Dashboard() {
    const [todos, setTodos] = useState([
        { id: 1, title: 'Complete project documentation', completed: false, dueDate: '2024-03-20' },
        { id: 2, title: 'Review pull requests', completed: true, dueDate: '2024-03-18' },
        { id: 3, title: 'Update dependencies', completed: false, dueDate: '2024-03-15' },
        { id: 4, title: 'Complete project documentation', completed: false, dueDate: '2024-03-20' },
        { id: 5, title: 'Review pull requests', completed: true, dueDate: '2024-03-18' },
        { id: 6, title: 'Update dependencies', completed: false, dueDate: '2024-03-15' },
        { id: 7, title: 'Complete project documentation', completed: false, dueDate: '2024-03-20' },
        { id: 8, title: 'Review pull requests', completed: true, dueDate: '2024-03-18' },
        { id: 9, title: 'Update dependencies', completed: false, dueDate: '2024-03-15' },
    ]);

    const { deletedTodos, setDeletedTodos } = useState([]);

    const handleComplete = () => { }
    const handleDelete = (todoId) => {
        setTodos(todos.filter(todo => todo.id !== todoId))
        setIsDeleting({
            status: false,
            id: null
        })
    }
    const handleEdit = () => { }
    const handleNewTodo = () => { }
    const [isDeleting, setIsDeleting] = useState({
        status: false,
        id: null
    });

    return (
        <div className={styles.container}>
            <Navbar />
            <div style={{ paddingTop: '80px', opacity: isDeleting.status ? '0.1' : '1', pointerEvents: isDeleting.status ? 'none' : 'auto' }}>
                <TodoStats />
                <div>
                    <div className={styles.todoHeaders}>
                        <div className={styles.title}>Todos List</div>
                        <div className={styles.menuOptions}>
                            <Filter />
                            <button className={styles.newTodo}>
                                <Plus className={styles.plusIcon} />
                                New Todo
                            </button>
                        </div>
                    </div>

                    <TodoList
                        todos={todos}
                        onComplete={handleComplete}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        isDeleting={isDeleting}
                        setIsDeleting={setIsDeleting}
                    />
                </div>
            </div>
            {
                isDeleting.status && (
                    <div className={styles.deleteConfirmation}>
                        <div>Do you wish to delete this Todo?</div>
                        <div>
                            <button
                                onClick={() => setIsDeleting({
                                    status: false,
                                    id: null
                                })}
                                className={styles.cancelButton}
                            >
                                <X />
                            </button>
                            <button
                                onClick={() => handleDelete(isDeleting.id)}
                                className={styles.deleteButton}
                            >
                                <Trash2 />
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}