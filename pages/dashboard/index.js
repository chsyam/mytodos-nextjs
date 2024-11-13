"use client";
import TodoList from "@/Components/todos/TodoList";
import TodoStats from "@/Components/TodoStats";
import { useEffect, useState } from "react";
import styles from "./../../styles/todos/TodoList.module.css"
import { Plus, Trash2, X } from "lucide-react";
import AddTodo from "@/Components/todos/AddTodo";
import UpdateTodo from "@/Components/todos/UpdateTodo";
import { getAuth, getIdToken, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/Components/FirebaseConfig";
import { useRouter } from 'next/router';
import { decrypt } from "../api/auth/lib";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

export default function Dashboard({ userEmail, userPassword, dbLink, todosList, payload }) {
    const [todos, setTodos] = useState([]);
    const router = useRouter();
    const [userData, setUserData] = useState({
        username: '',
        userId: '',
        email: ''
    })

    const [selectedFilter, setSelectedFilter] = useState('NA');
    const options = [
        { value: 'NA', label: 'All Todos' },
        { value: 'overdue', label: 'Overdue' },
        { value: 'pending', label: 'Pending' },
        { value: 'completed', label: 'Completed' }
    ]

    useEffect(() => {
        try {
            setUserData({
                username: payload.username,
                userId: payload.userId,
                email: payload.email
            })
        } catch (error) {
            router.push("/login");
        }
    }, [payload])

    useEffect(() => {
        let tempKeys = Object.keys(todosList);
        let tempValues = Object.values(todosList);
        let tempTodos = [];
        for (let i = 0; i < tempKeys.length; i++) {
            tempValues[i]['todoObjId'] = tempKeys[i];
            tempTodos.push(tempValues[i])
        }
        setTodos(tempTodos);
    }, [todosList])

    const [addingNewTodo, setAddingNewTodo] = useState(false);
    const [isCompleting, setIsCompleting] = useState({
        status: false,
        todoObjId: null
    });

    const [isUpdating, setIsUpdating] = useState({
        status: false,
        todoItem: null
    });

    async function completeTodo(todoObjId, todo) {
        try {
            const response = await fetch(`/api/todos/updateTodo?todoObjId=${todoObjId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todo)
            });
            console.log("response", response)
            if (response.ok) {
                const result = await response.json();
                toast.success('Wohoo! You have completed the task');
                console.log(result.message);
                router.reload();
            } else {
                console.error('Failed to delete the item.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleComplete = (todoObjId, todo) => {
        setIsCompleting(!isCompleting);
        todo.status = "Completed";
        completeTodo(todoObjId, todo);
        setIsCompleting(!isCompleting);
    }

    const handleDelete = async (todoId) => {
        try {
            const response = await fetch(`/api/todos/deleteTodo?todoObjId=${todoId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("response", response)
            if (response.ok) {
                const result = await response.json();
                toast.success("You have deleted the task!");
                console.log(result.message);
                setIsDeleting({
                    status: false,
                    id: null
                })
                router.reload();
            } else {
                console.error('Failed to delete the item.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const [isDeleting, setIsDeleting] = useState({
        status: false,
        id: null
    });

    const handleChange = (option) => {
        console.log(option)
        setSelectedFilter(option.value)
    }

    return (
        <div className={styles.container}>
            <div className={styles.todoContainer} style={{ paddingTop: '10px', opacity: (isDeleting.status || addingNewTodo || isUpdating.status) ? '0.1' : '1', pointerEvents: (isDeleting.status || addingNewTodo || isUpdating.status) ? 'none' : 'auto' }}>
                <TodoStats todosList={todos} />
                <div>
                    <div className={styles.todoHeaders}>
                        <div className={styles.title}>Todos List</div>
                        <div className={styles.menuOptions}>
                            <Select
                                placeholder={"Filter Todos"}
                                options={options}
                                onChange={handleChange}
                            />
                            <button
                                onClick={() => setAddingNewTodo(!addingNewTodo)}
                                className={styles.newTodo}>
                                <Plus className={styles.plusIcon} />
                                New Todo
                            </button>
                        </div>
                    </div>
                    <TodoList
                        todos={todos}
                        onComplete={handleComplete}
                        isDeleting={isDeleting}
                        setIsDeleting={setIsDeleting}
                        isUpdating={isUpdating}
                        setIsUpdating={setIsUpdating}
                        isCompleting={isCompleting}
                        setIsCompleting={setIsCompleting}
                        selectedFilter={selectedFilter}
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
            {
                addingNewTodo && (
                    <div className={styles.AddConfirmation}>
                        <AddTodo userEmail={userEmail} userPassword={userPassword} dbLink={dbLink} setAddingNewTodo={setAddingNewTodo} addingNewTodo={addingNewTodo} userData={userData} />
                    </div>
                )
            }
            {
                isUpdating.status && (
                    <div className={styles.updateConfirmation}>
                        <UpdateTodo setIsUpdating={setIsUpdating} todoItem={isUpdating.todoItem} />
                    </div>
                )
            }
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

export async function getServerSideProps(context) {
    const { req, res } = context;
    const token = req?.cookies['token']
    const payload = await decrypt(token)
    if (!payload || payload === null || payload === undefined) {
        res.setHeader('Set-Cookie', [
            'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;',
        ]);

        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    const userEmail = process.env.NEXT_PUBLIC_USER_EMAIL;
    const userPassword = process.env.NEXT_PUBLIC_USER_PASSWORD;
    const dbLink = process.env.NEXT_PUBLIC_DATABASE_URL;

    try {
        var idToken = "";
        const auth = getAuth(app);
        await signInWithEmailAndPassword(auth, process.env.NEXT_PUBLIC_USER_EMAIL, process.env.NEXT_PUBLIC_USER_PASSWORD).then(async (userCredential) => {
            idToken = await getIdToken(auth.currentUser);
        }).catch((error) => {
            console.log(error);
        });

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_DATABASE_URL}/mytodos.json?auth=${idToken}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        let tempList = await response.json();
        let temp = [];
        if (tempList) {
            temp = Object.keys(tempList).filter((todoKey) => {
                return tempList[todoKey]["userId"] === payload?.userId
            });
        }

        let todosList = {};
        temp.forEach((todoKey) => {
            todosList[todoKey] = tempList[todoKey]
        })

        if (!response.ok || !todosList)
            todosList = [];

        return {
            props: {
                userEmail,
                userPassword,
                dbLink,
                todosList: todosList,
                payload: payload
            },
        }
    } catch (error) {
        console.log(error);
        return {
            props: {
                userEmail,
                userPassword,
                dbLink,
                todosList: [],
                payload: payload
            },
        }
    }
}