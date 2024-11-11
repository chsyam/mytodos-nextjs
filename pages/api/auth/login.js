import bcrypt from "bcryptjs"
import { encrypt } from "./lib";
import jwt from 'jsonwebtoken'
import { getAuth, getIdToken, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/Components/FirebaseConfig";

const userEmail = process.env.NEXT_PUBLIC_USER_EMAIL;
const userPassword = process.env.NEXT_PUBLIC_USER_PASSWORD;
const dbLink = process.env.NEXT_PUBLIC_DATABASE_URL;
const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET;

export default async function loginHandler(req, res) {
    const { email, password } = { email: req.body['email'], password: req.body['password'] };

    try {
        var idToken = "";
        const auth = getAuth(app);
        await signInWithEmailAndPassword(auth, userEmail, userPassword).then(async (userCredential) => {
            idToken = await getIdToken(auth.currentUser);
        }).catch((error) => {
            console.log(error);
        });

        const response = await fetch(
            `${dbLink}/users.json?auth=${idToken}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const users = await response.json();
        const user = Object.values(users).find(user => user.email === email);

        if (user) {
            const isAuthenticated = await bcrypt.compare(password, user.password);
            if (isAuthenticated) {
                const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
                const session = await encrypt({
                    username: user?.username,
                    email: user?.email,
                    userId: user?.userId,
                    expires: expires
                });
                const token = jwt.sign({
                    userId: user?.userId,
                    username: user?.username,
                    email: user?.email,
                }, jwtSecret, {
                    expiresIn: '1440m',
                })
                console.log(token)
                return res.status(200).json({ token: token, message: 'Login successful' });
            } else {
                console.log("Invalid Credentials...!");
                return res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            console.log("user not found", "Invalid Credentials...!");
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log("error fetching api details", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}