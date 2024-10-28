import { app } from "@/Components/FirebaseConfig";
import { getAuth, getIdToken, signInWithEmailAndPassword } from "firebase/auth";

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const { todoObjId } = req.query;
        console.log("delete todo with ID", todoObjId)
        try {
            var idToken = "";
            const auth = getAuth(app);
            const userEmail = process.env.NEXT_PUBLIC_USER_EMAIL;
            const userPassword = process.env.NEXT_PUBLIC_USER_PASSWORD;
            await signInWithEmailAndPassword(auth, userEmail, userPassword).then(async (userCredential) => {
                console.log("userCredential", userCredential);
                idToken = await getIdToken(auth.currentUser);
            }).catch((error) => {
                console.log("error =>", error);
            });
            const response = await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/mytodos/${todoObjId}.json?auth=${idToken}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("response", response);
            if (response.ok) {
                console.log("response.ok", response.ok);
                res.status(200).json({ message: `Item with ID ${todoObjId} deleted successfully.` });
            } else {
                res.status(500).json({ error: 'Failed to delete the item.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete the item.' });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
