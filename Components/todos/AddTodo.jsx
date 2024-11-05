import DatePicker from "react-datepicker";
import styles from "./../../styles/CreateTodo.module.css"
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from 'uuid';
import { getAuth, getIdToken, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/Components/FirebaseConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "@/Components/Spinner";
import { useRouter } from "next/router";


export default function AddTodo({ userEmail, userPassword, dbLink, setAddingNewTodo, addingNewTodo }) {
    const router = useRouter();

    const [todoData, setTodoData] = useState({
        userId: '1',
        todoId: uuidv4(),
        title: '',
        description: '',
        dueDate: new Date(),
        createdAt: new Date(),
        status: 'pending'
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
            var idToken = "";
            const auth = getAuth(app);
            await signInWithEmailAndPassword(auth, userEmail, userPassword).then(async (userCredential) => {
                // console.log("userCredential", userCredential);
                idToken = await getIdToken(auth.currentUser);
            }).catch((error) => {
                console.log("error =>", error);
            });

            const response = await fetch(
                `${dbLink}/mytodos.json?auth=${idToken}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todoData),
            });
            console.log("response", response);

            if (response.ok) {
                router.reload();
            }
        } catch (error) {
            console.log(error);
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
                        rows={1}
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
                            setTodoData({
                                userId: '1',
                                todoId: uuidv4(),
                                title: '',
                                description: '',
                                dueDate: new Date(),
                                createdAt: new Date(),
                                status: 'Pending'
                            })
                            setAddingNewTodo(!addingNewTodo);
                        }}
                        style={{ color: 'red', border: '1px solid red' }}
                        type="reset"
                        className={styles.cancelButton}
                    >Cancel</button>
                    <button
                        style={{ backgroundColor: 'green', color: 'white', border: '1px solid green', opacity: isLoading ? '0.5' : '1', pointerEvents: isLoading ? 'none' : 'auto' }}
                        disabled={isLoading}
                        type="submit"
                        className={styles.submitButton}
                    >{isLoading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}><Spinner />{'Add Todo'}</div> : "Add Todo"}</button>
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
