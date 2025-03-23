import { Component, inject } from '@angular/core';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { IResponse } from '../../interfaces/iresponse.interface';
import { toast } from 'ngx-sonner';
import { UsuariosCardComponent } from '../../components/usuarios-card/usuarios-card.component';

@Component({
  selector: 'app-usuarios',
  imports: [ UsuariosCardComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  misUsuarios: IUsuario[] = [];
  usuariosService = inject(UsuariosService)
  page: number = 0;
  siguientePagina: number = 0;
  anteriorPagina: number = 0;


  async ngOnInit() {
    this.listaUsuarios()
  }

  async siguiente() {
    this.listaUsuarios(this.siguientePagina)
  }

  async anterior() {
    this.listaUsuarios(this.anteriorPagina)
  }

  async listaUsuarios(page: number = 0) {
    try {
      let response: IResponse = await this.usuariosService.getAll(page);
      this.page = response.page;
      this.siguientePagina = response.page == response.total_pages ? 0 : response.page + 1;
      this.anteriorPagina = response.page == 1 ? 0 : response.page -1;
      this.misUsuarios = response.results;
    } catch(error){
      toast.error('Error al cargar los usuarios');
    }
  }



}
