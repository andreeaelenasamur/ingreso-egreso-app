import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth);

  crearUsuario( nombre: string, email: string , password: string ){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  loginUsuario( email: string, password: string ) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return this.auth.signOut();
  }

}
