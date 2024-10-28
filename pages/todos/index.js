import styles from "./../../styles/Dashboard.module.css";
import { IoMdAdd } from "react-icons/io";
import { useRouter } from "next/router";
import { getAuth, getIdToken, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/Components/FirebaseConfig";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import Spinner from "@/Components/Spinner";

export default function Dashboard(props) {
    const router = useRouter();
    const [inDetail, setInDetail] = useState([false, '', '']);
    const todos_keys = Object.keys(props.todosList);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isCompleting, setIsCompleting] = useState(false);

    // console.log("props.todosList", Object.keys(props.todosList))
    const [todosList, setTodosList] = useState([]);
    useEffect(() => {
        let getKeys = Object.keys(props.todosList);
        let temp = []
        for (let index = 0; index < getKeys.length; index++) {
            temp.push(props.todosList[getKeys[index]])
        }
        setTodosList(temp)
    }, [props])

    const getTodoStatus = (dueDate, status) => {
        const today = new Date();
        const due = new Date(dueDate);
        if (status === 'Completed') {
            return status
        }
        if (due < today) {
            return "Overdue";
        } else if (due > today) {
            return "Pending";
        }
    }

    const getDueDate = (dueDate) => {
        const due = new Date(dueDate);
        return `${due.toString().slice(0, 21)}`;
    }

    async function completeTodo(todoId, todoObj) {
        try {
            const response = await fetch(`/api/todos/updateTodo?todoObjId=${todoId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todoObj)
            });
            console.log("response", response)
            if (response.ok) {
                const result = await response.json();
                console.log(result.message);
                router.reload();
            } else {
                console.error('Failed to delete the item.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleComplete = (todoId) => {
        setIsCompleting(!isCompleting);
        const todoObj = props.todosList[todoId]
        todoObj.status = "Completed";
        todoObj.dueDate = new Date();
        completeTodo(todoId, todoObj);
        setIsCompleting(!isCompleting);
    }

    async function deleteTodo(todoId) {
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
                console.log(result.message);
                router.reload();
            } else {
                console.error('Failed to delete the item.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleDelete = (todoId) => {
        setIsDeleting(!isDeleting);
        deleteTodo(todoId);
        setIsDeleting(!isDeleting);
    }

    return (
        <div className={styles.dashboard}>
            {
                inDetail[0] ? (
                    <div className={styles.inDetailContainer}>
                        <div className={styles.buttonSection}>
                            <button
                                onClick={() => {
                                    router.push({
                                        pathname: '/todos/update',
                                        query: { todoId: inDetail[1] }
                                    })
                                }}
                                style={{
                                    backgroundColor: 'yellow', border: '1px solid yellow', cursor: 'pointer'
                                }}
                            >Modify</button>
                            <button
                                onClick={() => { handleComplete(inDetail[1]) }}
                                style={{
                                    backgroundColor: 'green', border: '1px solid green', color: 'white', cursor: 'pointer'
                                }}
                            >
                                {isCompleting ? <Spinner /> : "Complete"}
                            </button>
                            <button
                                onClick={() => { handleDelete(inDetail[1]) }}
                                style={{
                                    backgroundColor: 'red', border: '1px solid red', color: 'white', cursor: 'pointer'
                                }}
                            >
                                {isDeleting ? <Spinner /> : "Delete"}
                            </button>
                            <div
                                onClick={() => setInDetail([false, '', ''])}
                                style={{
                                    border: 'none', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', display: 'flex', fontSize: '2rem', cursor: 'pointer',
                                }}
                            >
                                <FaTimes />
                            </div>
                        </div>
                        <div>
                            <div className={styles.title}>
                                {' Title:'}
                                <span>
                                    {props.todosList[inDetail[1]].title}
                                </span>
                            </div>
                            <div className={styles.description}>
                                {'Description: '}
                                <span>
                                    {props.todosList[inDetail[1]].description}
                                </span>
                            </div>
                            <div className={styles.dueDate}>
                                {'Due By:'}
                                <span>
                                    {getDueDate(props.todosList[inDetail[1]].dueDate)}
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.todoListContainer}>
                        <table>
                            <tbody>
                                {
                                    todosList.map((item, index) => {
                                        return (
                                            <tr className={styles.tableRow} key={index}>
                                                <td className={styles.todoTitle}>{item.title}</td>
                                                <td className={styles.status}>
                                                    {getDueDate(item.dueDate)}
                                                </td>
                                                <td className={styles.status}>
                                                    {getTodoStatus(item.dueDate, item.status)}
                                                </td>
                                                <td>
                                                    <div className={styles.menuArrow}
                                                        onClick={() => setInDetail([!inDetail[0], todos_keys[index], item.todoId])}>
                                                        <FaChevronDown />
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }
            <div className={styles.addTask} onClick={() => router.push("/todos/add")}><IoMdAdd /></div>
        </div >
    );
}

export async function getServerSideProps(context) {
    const { req, res } = context;
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
            `${process.env.NEXT_PUBLIC_DATABASE_URL}/mytodos.json?auth=${idToken}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        todosList = await response.json();
        if (!response.ok || !todosList) {
            todosList = [];
        }
        // console.log(todosList)

        return {
            props: {
                todosList: todosList,
            },
        }
    } catch (error) {
        console.log(error);
        return {
            props: {
                todoList: [],
            },
        }
    }
}