import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged // 🌟 1. Añadimos esta función de Firebase
} from 'firebase/auth';
import { Observable } from 'rxjs'; // 🌟 2. Añadimos Observable de RxJS

const firebaseConfig = {
  apiKey: "AIzaSyBeIqX-GXYx0qCYqL4lrdkiWFpfPDH6upA",
  authDomain: "game-survey-campus-f1b93.firebaseapp.com",
  projectId: "game-survey-campus-f1b93",
  storageBucket: "game-survey-campus-f1b93.firebasestorage.app",
  messagingSenderId: "642507879648",
  appId: "1:642507879648:web:d1fbcb1eb1b51069e30c85",
  measurementId: "G-ZTMQREFBXT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  async register(email: string, password: string){
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  async login(email: string, password: string){
    return await signInWithEmailAndPassword(auth, email, password);
  }

  async logout(){
    return await signOut(auth);
  }

  getUsuario(){
    return auth.currentUser;
  }

  // 🌟 3. NUEVO MÉTODO: Escucha en tiempo real si hay cambios en la sesión
  getAuthState(): Observable<any> {
    return new Observable((observer) => {
      onAuthStateChanged(auth, (user) => {
        observer.next(user);
      });
    });
  }
}