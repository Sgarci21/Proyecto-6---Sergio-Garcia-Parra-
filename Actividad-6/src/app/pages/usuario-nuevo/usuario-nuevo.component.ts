import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-usuario-nuevo',
  imports: [ReactiveFormsModule],
  templateUrl: './usuario-nuevo.component.html', 
  styleUrls: ['./usuario-nuevo.component.css'] 

})
export class UsuarioNuevoComponent {
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
    });
  }

  getDataForm() {
    this.userForm.reset();
  }

  checkControl(controlName: string, errorName: string): boolean | undefined {
    return this.userForm.get(controlName)?.hasError(errorName) && this.userForm.get(controlName)?.touched;
  }

  botonHecho() {
    if (this.userForm.valid) {
      toast.success('¡Enhorabuena, usuario creado!');
      this.router.navigate(['/usuarios']);
    } else {
      toast.error('Por favor, rellena todos los campos obligatorios para poder continuar.');
      this.userForm.markAllAsTouched();
    }
  }
}
