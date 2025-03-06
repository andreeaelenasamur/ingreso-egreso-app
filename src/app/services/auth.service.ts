import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth);

  initAuthListener() {
    return this.auth.beforeAuthStateChanged(user => {
      console.log(user?.email);
      console.log(user?.uid);
    })
  }

  crearUsuario( nombre: string, email: string , password: string ){
    return createUserWithEmailAndPassword(this.auth, email, password);
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
