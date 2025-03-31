import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, Unsubscribe } from '@angular/fire/auth';
import { map, Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as actions from '../auth/auth.actions';
import { getDocs, query, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userUnsubscribe!: Unsubscribe;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
    authState(this.auth).subscribe( async fUser => {
      console.log(fUser)
      if( fUser ) {
        const userRef = collection(this.firestore, 'user');
        const q = query(userRef, where("uid", "==", fUser.uid));
        const querySnapshot = (await getDocs(q));
        querySnapshot.forEach(( doc: any ) => {
          this.store.dispatch(actions.setUser({ user: doc.data() }));
        });
      } else {
        this.userUnsubscribe ? this.userUnsubscribe() : null;
        this.store.dispatch(actions.unSetUser());
      }
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
