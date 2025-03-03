import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styles: ``
})
export class RegisterComponent implements OnInit {

  registroForm!: FormGroup;

  constructor( private fb: FormBuilder ) {}

  ngOnInit(): void {

    this.registroForm = this.fb.group({
      nombre: ['', Validators.required ],
      correo: ['', [Validators.required, Validators.email] ],
      password: ['', Validators.required ],
    })

  }

  crearUsuario() {
    console.log(this.registroForm);
    console.log(this.registroForm.valid);
    console.log(this.registroForm.value);
  }


}
