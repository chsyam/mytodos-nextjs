import styles from "./../../styles/Dashboard.module.css";
import { IoMdAdd } from "react-icons/io";
import { useRouter } from "next/router";
import { getAuth, getIdToken, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/Components/FirebaseConfig";
import { useEffect, useState } from "react";

export default function Dashboard(props) {
    const router = useRouter();

    console.log(Object.keys(props.todosList))
    const [todosList, setTodosList] = useState([]);
    useEffect(() => {
        let getKeys = Object.keys(props.todosList);
        console.log(getKeys)
        let temp = []
        for (let index = 0; index < getKeys.length; index++) {
            temp.push(props.todosList[getKeys[index]])
        }
        setTodosList(temp)
    }, [props])

    const getTodoStatus = (dueDate) => {
        const today = new Date();
        const due = new Date(dueDate);
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

    return (
        <div className={styles.dashboard}>
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
                                            {getTodoStatus(item.dueDate)}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
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
        console.log(todosList)

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