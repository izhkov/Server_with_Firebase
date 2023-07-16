import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyBuKYI04oFOtD6p4AkjMYGj8Q4GiXfstJU',
  authDomain: 'task-list-9c4ac.firebaseapp.com',
  projectId: 'task-list-9c4ac',
  storageBucket: 'task-list-9c4ac.appspot.com',
  messagingSenderId: '378174565160',
  appId: '1:378174565160:web:abee4d638a3f5940da3e1d',
  databaseURL:
    'https://task-list-9c4ac-default-rtdb.europe-west1.firebasedatabase.app/',
}

const app = initializeApp(firebaseConfig)

export const db = getDatabase(app)
