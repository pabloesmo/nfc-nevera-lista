import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCrv71BVdh7ZPbTRcVkuuuFXMREcmlJGu0",
  authDomain: "nfc-fridge-compra.firebaseapp.com",
  projectId: "nfc-fridge-compra",
  storageBucket: "nfc-fridge-compra.firebasestorage.app",
  messagingSenderId: "134122647316",
  appId: "1:134122647316:web:5c91e00f0c2a6d9e855c01"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)