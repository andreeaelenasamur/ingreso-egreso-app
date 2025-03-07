import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { map, Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {}


  initAuthListener() {
    return this.auth.beforeAuthStateChanged(user => {
      console.log(user?.email);
      console.log(user?.uid);
    })
  }

  crearUsuario( nombre: string, email: string , password: string ){
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then( ({ user }) => {

        const newUser = new Usuario( user.uid, nombre, user.email! );
        const userRef = collection(this.firestore, `user`);

        return addDoc( userRef, {...newUser} );

      });
  }

  loginUsuario( email: string, password: string ) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return new Observable((suscriber) => {
      const unsubscribe = this.auth.onAuthStateChanged(suscriber);
      return { unsubscribe };
    }).pipe(map((fbUser) => fbUser != null))
  }

}
