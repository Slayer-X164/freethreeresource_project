import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, doc, setDoc, updateDoc, serverTimestamp, increment, arrayUnion } from "firebase/firestore"; // Correct imports

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: "freethreeresource",
  storageBucket: "freethreeresource.firebasestorage.app",
  messagingSenderId: "940220854769",
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: "G-71E40TKKH4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore

document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Get or create visitor ID
        let visitorId = localStorage.getItem('visitorId');
        const isNewVisitor = !visitorId;

        if (!visitorId) {
            visitorId = 'vis_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('visitorId', visitorId);
        }

        // Get visitor data
        const page = window.location.pathname;
        const referrer = document.referrer;
        const userAgent = navigator.userAgent;
        const ip = await fetch('https://api.ipify.org?format=json')
            .then(res => res.json())
            .then(data => data.ip)
            .catch(() => null);

        // Firestore reference (Modular SDK syntax)
        const visitorsCollection = collection(db, 'visitors');
        const visitorRef = doc(visitorsCollection, visitorId);

        if (isNewVisitor) {
            // Create new visitor document
            await setDoc(visitorRef, {
                firstVisit: serverTimestamp(),
                lastVisit: serverTimestamp(),
                visitCount: 1,
                referrer: referrer,
                pagesVisited: [page],
                userAgent: userAgent,
                ipAddress: ip
            });
        } else {
            // Update existing visitor
            await setDoc(visitorRef, {
                lastVisit: serverTimestamp(),
                visitCount: increment(1),
                pagesVisited: arrayUnion(page)
            }, { merge: true }); // This merges with existing doc or creates new one
        }
    } catch (error) {
        console.error("Error writing to Firestore:", error);
    }
});