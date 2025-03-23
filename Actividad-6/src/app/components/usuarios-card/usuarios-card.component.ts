import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { IUsuario } from '../../interfaces/iusuario.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuarios-card',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './usuarios-card.component.html',
  styleUrl: './usuarios-card.component.css'
})
export class UsuariosCardComponent {
  @Input() miUsuario!: IUsuario; // Elimina | any
  usuariosService = inject(UsuariosService);
  @Output() deleteItemEmit: EventEmitter<Boolean> = new EventEmitter();
  router = inject(Router);
  toast = inject(ToastrService); // Inyecta ToastrService

  eliminarUsuario(id: string) {
    if (confirm(`¿Estás seguro de que deseas eliminar al usuario ${this.miUsuario.first_name} ${this.miUsuario.last_name}?`)) {
      this.usuariosService.delete(id).then(() => {
        if (this.deleteItemEmit.observed) {
          this.deleteItemEmit.emit(true);
        } else {
          this.router.navigate(['/usuarios']);
        }
        this.toast.success('Usuario eliminado correctamente', 'Éxito'); 
      }).catch(() => {
        this.toast.error('Error al eliminar el usuario', 'Error'); 
      });
    }
  }
}