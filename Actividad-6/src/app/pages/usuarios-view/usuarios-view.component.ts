import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; // Importa ToastrService

@Component({
  selector: 'app-usuario-vista',
  standalone: true,
  imports: [RouterModule], // Cambia RouterLink por RouterModule
  templateUrl: './usuarios-view.component.html',
  styleUrl: './usuarios-view.component.css'
})
export class UsuarioVistaComponent {
  @Input() id: string = "";
  usuariosService = inject(UsuariosService);
  usuario!: IUsuario;
  @Output() deleteItemEmit: EventEmitter<Boolean> = new EventEmitter();
  router = inject(Router);
  toast = inject(ToastrService); // Inyecta ToastrService

  async ngOnInit() {
    try {
      const response = await this.usuariosService.getById(this.id);

      if (response && response.id) {
        this.usuario = response;
      } else {
        this.toast.error('El ID de usuario no existe', 'Error'); // Notificación de error
        this.router.navigate(['/usuarios']);
      }
    } catch (error) {
      this.toast.error('No se pudo cargar la información del usuario', 'Error'); // Notificación de error
      this.router.navigate(['/usuarios']);
    }
  }

  eliminarUsuario(id: string) {
    if (confirm(`¿Estás seguro de que deseas eliminar al usuario ${this.usuario.first_name} ${this.usuario.last_name}?`)) {
      this.usuariosService.delete(id).then(() => {
        if (this.deleteItemEmit.observed) {
          this.deleteItemEmit.emit(true);
        } else {
          this.router.navigate(['/usuarios']);
        }
        this.toast.success('Usuario eliminado correctamente', 'Éxito'); // Notificación de éxito
      }).catch(() => {
        this.toast.error('Error al eliminar el usuario', 'Error'); // Notificación de error
      });
    }
  }
}
