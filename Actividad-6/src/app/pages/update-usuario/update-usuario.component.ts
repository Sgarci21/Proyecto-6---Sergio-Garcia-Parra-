import { Component, inject, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-usuario',
  imports: [ReactiveFormsModule, ],
  templateUrl: './update-usuario.component.html',
  styleUrl: './update-usuario.component.css'
})
export class UpdateUsuarioComponent {

  userForm: FormGroup;
  router = inject(Router);


  constructor() {
    this.userForm = new FormGroup({
      first_name: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      last_name: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(/^\w+\@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
      ]),
      image: new FormControl("", [
        Validators.required,
        Validators.pattern(/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/)
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16)
      ])
    })
  }

  

  getDataForm() {
    this.userForm.reset()
  }

  checkControl(controlName: string, errorName: string): boolean | undefined {
    return this.userForm.get(controlName)?.hasError(errorName) && this.userForm.get(controlName)?.touched
  }

  botonHecho() {
      if (this.userForm.valid) {
        toast.success('¡Usuario actualizado correctamente!');
        // console.log('Datos del formulario:', this.userForm.value);
        this.router.navigate(['/usuarios']);
      } else {
        toast.error('Por favor, rellena todos los campos correctamente antes de continuar.');
        this.userForm.markAllAsTouched();
        
      }
    }

 }

