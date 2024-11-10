import { app } from "@/Components/FirebaseConfig";
import bcrypt from "bcryptjs"
import { getAuth, getIdToken, signInWithEmailAndPassword } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

const userEmail = process.env.NEXT_PUBLIC_USER_EMAIL;
const userPassword = process.env.NEXT_PUBLIC_USER_PASSWORD;
const dbLink = process.env.NEXT_PUBLIC_DATABASE_URL;

export default async function handler(req, res) {
    const { username, fullName, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 5);
    const userId = uuidv4();
    const newUser = {
        userId: userId,
        fullName: fullName,
        username: username,
        email: email,
        password: hashedPassword,
        isVerified: false,
        createdAt: new Date(),
    }

    try {
        var idToken = "";
        const auth = getAuth(app);

        await signInWithEmailAndPassword(auth, userEmail, userPassword).then(async (userCredential) => {
            idToken = await getIdToken(auth.currentUser);
        }).catch((error) => {
            console.log(error);
        });

        const response = await fetch(`${dbLink}/users.json?auth=${idToken}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });

        return res.status(200).json({
            userId: userId, hashedPassword: hashedPassword, messgae: "User saved succesfully"
        });
    } catch (error) {
        console.log("error fetching api details", error);
        return res.status(500).json({
            data: null, message: 'Something went wrong'
        });
    }
}