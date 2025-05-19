import { Injectable } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { addDoc, collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) { }

  async crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const id = this.authService.userId;
    ingresoEgreso.uid = id;


    const collectionInstance = collection(this.firestore, `user/${id}/items`)

    const documentRef = doc(collectionInstance);

    console.log(ingresoEgreso);

    return setDoc(documentRef, {...ingresoEgreso})
  }
}
