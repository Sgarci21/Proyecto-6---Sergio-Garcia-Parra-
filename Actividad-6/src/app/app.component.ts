import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavComponent } from './shared/nav.component';
import { UsuariosService, IUsuario } from './services/usuarios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Proyecto-6';
  usuarios: IUsuario[] = []; // Variable para almacenar los usuarios
  toastr = inject(ToastrService);
  usuariosService = inject(UsuariosService);

  async ngOnInit() {
    try {
      const response = await this.usuariosService.getAll();
      this.usuarios = response.results; // Asigna los usuarios obtenidos
    } catch (error) {
      this.toastr.error('Error al cargar los usuarios', 'Error');
      console.error('Error al cargar los usuarios:', error);
    }
  }
}
