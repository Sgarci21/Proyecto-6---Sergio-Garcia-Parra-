import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-usuario-vista',
  imports: [RouterLink],
  templateUrl: './vista-usuario.component.html',
  styleUrl: './vista-usuario.component.css'
})
export class VistaUsuarioComponent {
  @Input() id: string = ""
  usuariosService = inject(UsuariosService)
  usuario!: IUsuario
  @Output() deleteItemEmit: EventEmitter<Boolean> = new EventEmitter();
  

  router = inject(Router)

  async ngOnInit() {

   try{
     let response = await this.usuariosService.getById(this.id)
     
     if(response && response.id) {
       this.usuario = response;
       
      }else{
        toast.error('La id no existe')
        this.router.navigate(['/usuarios']);
     }

   } catch(error){
     toast.error("Imposible cargar el usuario")
     this.router.navigate(['/usuarios']);
   }
  }

  eliminarUsuario(id: string) {
    toast(`Procedes a borrar al usuario ? ${this.usuario.first_name} ${this.usuario.last_name} `, {
  
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
