import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail} from "firebase/auth";
import { User } from '../models/user.models';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { getFirestore, setDoc, doc, getDoc } from '@angular/fire/firestore'
import { UtilsService } from './utils.service';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  ulitl = inject(UtilsService);

  getAuth(){
    return getAuth();
  }

  LogIn(user : User){
    return signInWithEmailAndPassword(getAuth(), user.email, user.password)
  }

  signUp(user : User){
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password)
  }

  Update(displayName : string){
    return updateProfile(getAuth().currentUser, {displayName})
  }

  setDocument(path: string, data: any){
    return setDoc(doc(getFirestore(), path), data);

  }

  async getDocument(path: string){
    return  (await getDoc(doc(getFirestore(), path))).data();
  }

  recuperarcontra(email: string){
    return sendPasswordResetEmail(getAuth(), email);
  }

  salir(){
    getAuth().signOut();
    localStorage.removeItem('user');
    this.ulitl.routerLink('/auth')
  }
}
