import { app } from "@/Components/FirebaseConfig";
import { getAuth, getIdToken, signInWithEmailAndPassword } from "firebase/auth";

export default async function handler(req, res) {
    if (req.method === 'PATCH') {
        const todoObjId = req.query.todoObjId;
        const todoObj = req.body;
        console.log("update todo with ID", todoObjId, todoObj)
        try {
            var idToken = "";
            const auth = getAuth(app);
            const userEmail = process.env.NEXT_PUBLIC_USER_EMAIL;
            const userPassword = process.env.NEXT_PUBLIC_USER_PASSWORD;
            await signInWithEmailAndPassword(auth, userEmail, userPassword).then(async (userCredential) => {
                // console.log("userCredential", userCredential);
                idToken = await getIdToken(auth.currentUser);
            }).catch((error) => {
                console.log("error =>", error);
            });
            const response = await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/mytodos/${todoObjId}.json?auth=${idToken}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todoObj)
            });
            console.log("response", response);
            if (response.ok) {
                console.log("response.ok", response.ok);
                res.status(200).json({ message: `Item with ID ${todoObjId} updated successfully.` });
            } else {
                res.status(500).json({ error: 'Failed to update the item.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to update the item.' });
        }
    } else {
        res.setHeader('Allow', ['PATCH']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
