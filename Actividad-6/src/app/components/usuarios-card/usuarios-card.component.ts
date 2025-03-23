import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuarios-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './usuarios-card.component.html',
  styleUrl: './usuarios-card.component.css'
})
export class UsuariosCardComponent {
  @Input() miUsuario!: IUsuario;
  usuariosService = inject(UsuariosService);
  @Output() deleteItemEmit: EventEmitter<Boolean> = new EventEmitter();
  toast = inject(ToastrService);

  eliminarUsuario(id: string) {
    if (confirm(`¿Estás seguro de que deseas eliminar al usuario ${this.miUsuario.first_name} ${this.miUsuario.last_name}?`)) {
      this.usuariosService.delete(id).then(() => {
        if (this.deleteItemEmit.observed) {
          this.deleteItemEmit.emit(true);
        }
        this.toast.success('Usuario eliminado correctamente');
      }).catch(() => {
        this.toast.error('Error al eliminar el usuario');
      });
    }
  }
}
