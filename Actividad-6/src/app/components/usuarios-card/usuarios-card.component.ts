import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-usuarios-card',
  imports: [RouterLink],
  templateUrl: './usuarios-card.component.html',
  styleUrl: './usuarios-card.component.css'
})
export class UsuariosCardComponent {
  @Input() miUsuario!: IUsuario | any
  usuariosService = inject(UsuariosService)
  @Output() deleteItemEmit: EventEmitter<Boolean> = new EventEmitter();
  router = inject(Router)


  eliminarUsuario(id: string) {
    toast(`Vas a borrar al usuario ${this.miUsuario.first_name} ${this.miUsuario.last_name} `, {
      action: {
        label: 'Aceptar',
        onClick: async () => {
          await this.usuariosService.delete(id)
          if (this.deleteItemEmit.observed) {
            this.deleteItemEmit.emit(true)
          } else {
            this.router.navigate(['/usuarios']);
          }

        }
      }
    });
  }

}
