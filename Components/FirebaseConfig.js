import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
};
console.log("firebaseConfig", firebaseConfig)

const app = initializeApp(firebaseConfig, 'mytodos-latest');
export { app }