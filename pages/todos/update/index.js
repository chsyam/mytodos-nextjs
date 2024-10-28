import DatePicker from "react-datepicker";
import styles from "./../../../styles/CreateTodo.module.css"
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from 'uuid';
import { getAuth, getIdToken, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/Components/FirebaseConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "@/Components/Spinner";
import { useRouter } from "next/router";


export default function AddTodo({ todoId, todosList }) {
    const router = useRouter();
    console.log("todosList", todosList);
    if (todosList.length === 0) {
        router.push('/todos');
    }

    const [todoData, setTodoData] = useState({
        userId: todosList?.userId,
        todoId: todosList?.todoId,
        title: todosList?.title,
        description: todosList?.description,
        dueDate: new Date(todosList?.dueDate),
        createdAt: todosList?.createdAt,
        status: todosList?.status
    });

    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        isLoading &&
            toast.info('Adding task to your list')
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
        console.log(todoData);
        try {
            const response = await fetch(`/api/todos/updateTodo?todoObjId=${todoId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todoData)
            });
            console.log("response", response)
            if (response.ok) {
                const result = await response.json();
                console.log(result.message);
                router.push("/todos");
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
                        rows={5}
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
                        style={{ color: 'red', border: '1px solid red' }}
                        type="reset"
                        className={styles.cancelButton}
                    >Reset</button>
                    <button
                        style={{ backgroundColor: 'green', color: 'white', border: '1px solid green' }}
                        disabled={isLoading}
                        type="submit"
                        className={styles.submitButton}
                    >{isLoading ? <Spinner /> : "Update Todo"}</button>
                </div>
            </form>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="light"
            />
        </div>
    );
}

export async function getServerSideProps(context) {
    const { req, res } = context
    const { todoId } = context.query;
    console.log("todoId", todoId);
    let todosList = [];
    try {
        var idToken = "";
        const auth = getAuth(app);
        await signInWithEmailAndPassword(auth, process.env.NEXT_PUBLIC_USER_EMAIL, process.env.NEXT_PUBLIC_USER_PASSWORD).then(async (userCredential) => {
            idToken = await getIdToken(auth.currentUser);
        }).catch((error) => {
            console.log(error);
        });

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_DATABASE_URL}/mytodos/${todoId}.json?auth=${idToken}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        todosList = await response.json();
        if (!response.ok || !todosList) {
            todosList = [];
        }

        return {
            props: {
                todoId: todoId,
                todosList: todosList,
            },
        }
    } catch (error) {
        console.log(error);
        return {
            props: {
                todoId: '',
                todoList: [],
            },
        }
    }
}