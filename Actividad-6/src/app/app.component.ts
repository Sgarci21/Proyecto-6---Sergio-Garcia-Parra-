import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavComponent } from './shared/nav.component';
import { UsuariosService} from './services/usuarios.service';
import { ToastrService } from 'ngx-toastr';
import { IUsuario } from './interfaces/iusuario.interface';
import { HeaderComponent } from './components/Header/Header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, NavComponent, HeaderComponent,ToastrService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Proyecto-6';
  usuarios: IUsuario[] = [];
  toastr = inject(ToastrService);
  usuariosService = inject(UsuariosService);

  async ngOnInit() {
    try {
      const response = await this.usuariosService.getAll();
      this.usuarios = response.results; 
    } catch (error) {
      this.toastr.error('Error al cargar los usuarios', 'Error');
      console.error('Error al cargar los usuarios:', error);
    }
  }
  
}
