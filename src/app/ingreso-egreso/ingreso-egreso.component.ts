import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingreso-egreso',
  standalone: false,
  templateUrl: './ingreso-egreso.component.html',
  styles: ``
})
export class IngresoEgresoComponent {

  ingresoForm!: FormGroup;
  tipo: string = 'ingreso';

  constructor( private fb: FormBuilder ) {}

  ngOnInit() {

    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    })
  }

  guardar() {

    if( this.ingresoForm.invalid ) { return; }

    console.log(this.ingresoForm.value);
    console.log(this.tipo)
  }

}
