import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios-view',
  standalone: true,
  imports: [],
  templateUrl: './usuarios-view.component.html',
  styleUrl: './usuarios-view.component.css'
})
export class UsuariosViewComponent {
  @Input() id: string = "";
  usuariosService = inject(UsuariosService);
  usuario!: IUsuario;
  @Output() deleteItemEmit: EventEmitter<Boolean> = new EventEmitter();

  router = inject(Router);
  toast = inject(ToastrService); // Inyectamos ToastrService

  async ngOnInit() {
    try {
      const response = await this.usuariosService.getById(this.id);

      if (response && response.id) {
        this.usuario = response;
      } else {
        this.toast.error('El ID de usuario no existe'); // Cambiado a this.toast
        this.router.navigate(['/usuarios']);
      }
    } catch (error) {
      this.toast.error('No se pudo cargar la información de usuario'); // Cambiado a this.toast
      this.router.navigate(['/usuarios']);
    }
  }

  eliminarUsuario(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a borrar al usuario ${this.usuario.first_name} ${this.usuario.last_name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await this.usuariosService.delete(id);
          if (this.deleteItemEmit.observed) {
            this.deleteItemEmit.emit(true);
          } else {
            this.router.navigate(['/usuarios']);
          }
          this.toast.success('Usuario eliminado correctamente'); // Cambiado a this.toast
        } catch (error) {
          this.toast.error('Error al eliminar el usuario'); // Cambiado a this.toast
        }
      }
    });
  }
}
