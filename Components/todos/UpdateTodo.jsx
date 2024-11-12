import DatePicker from "react-datepicker";
import styles from "./../../styles/CreateTodo.module.css"
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "@/Components/Spinner";
import { useRouter } from "next/router";

export default function UpdateTodo({ setIsUpdating, todoItem }) {
    const router = useRouter();
    const [todoData, setTodoData] = useState({
        userId: todoItem?.userId,
        todoId: todoItem?.todoId,
        title: todoItem?.title,
        description: todoItem?.description,
        dueDate: new Date(todoItem?.dueDate),
        createdAt: todoItem?.createdAt,
        status: todoItem?.status
    });

    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        isLoading &&
            toast.success('Updated the task')
    }, [isLoading])

    const handleChange = (name, value) => {
        setTodoData({
            ...todoData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        todoData['createdAt'] = new Date();
        todoData['status'] = todoData['dueDate'] < new Date() ? 'Overdue' : 'Pending';
        // console.log(todoData);
        try {
            const response = await fetch(`/api/todos/updateTodo?todoObjId=${todoItem.todoObjId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todoData)
            });
            if (response.ok) {
                const result = await response.json();
                router.reload();
            } else {
                console.error('Failed to delete the item.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setIsLoading(false);
    }

    return (
        <div className={styles.todoForm}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.formElement}>
                    <label htmlFor="title">Title
                        <span style={{ color: 'red' }}>*</span>
                    </label><br />
                    <textarea
                        id="title"
                        rows={2}
                        placeholder="enter title"
                        name="title"
                        value={todoData.title}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formElement}>
                    <label htmlFor="description">Description (optional)</label><br />
                    <textarea
                        id="description"
                        rows={2}
                        placeholder="enter description"
                        name="description"
                        value={todoData.description}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                </div>
                <div className={styles.formElement}>
                    <label htmlFor="dueDate">Due Date (optional)</label><br />
                    <DatePicker
                        id="dueDate"
                        className={styles.calendar}
                        showTimeSelect={true}
                        dateFormat="MMM d, yyyy  h:mm aa"
                        selected={todoData.dueDate}
                        onChange={(date) => {
                            setTodoData({
                                ...todoData,
                                dueDate: date
                            })
                        }} />
                </div>
                <div className={styles.buttonGroup}>
                    <button
                        onClick={() => {
                            setIsUpdating({
                                status: false,
                                todoItem: null
                            })
                        }}
                        style={{ color: 'red', border: '1px solid red' }}
                        type="reset"
                        className={styles.cancelButton}
                    >Cancel</button>
                    <button
                        style={{ backgroundColor: 'green', color: 'white', border: '1px solid green' }}
                        disabled={isLoading}
                        type="submit"
                        className={styles.submitButton}
                    >{isLoading ? <Spinner /> : "Update Todo"}</button>
                </div>
            </form>
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="dark"
            />
        </div>
    );
}