import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; // Importa ToastrService

@Component({
  selector: 'app-nuevo-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './new-usuario.component.html',
  styleUrl: './new-usuario.components.css'
})
export class NuevoUsuarioComponent {

  userForm: FormGroup;
  router = inject(Router);
  toast = inject(ToastrService); // Inyecta ToastrService

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
      this.toast.success('¡Usuario creado correctamente!', 'Éxito'); // Notificación de éxito
      this.router.navigate(['/usuarios']);
    } else {
      this.toast.error('Por favor, rellena todos los campos correctamente antes de continuar.', 'Error'); // Notificación de error
      this.userForm.markAllAsTouched();
    }
  }
}
