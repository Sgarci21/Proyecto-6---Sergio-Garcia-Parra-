import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './shared/nav.component';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, BrowserAnimationsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
,
})
export class AppComponent {
  title = 'Proyecto 6 Sergio Garcia Parra';

    constructor(private toastr: ToastrService) {} // Inyectar ToastrService
  
    showSuccess() {
      // Usar ToastrService para mostrar una notificación de éxito
      this.toastr.success('¡Operación exitosa!', 'Éxito');
    }
  
    showError() {
      // Usar ToastrService para mostrar una notificación de error
      this.toastr.error('Algo salió mal', 'Error');
    }
  
    showInfo() {
      // Usar ToastrService para mostrar una notificación de información
      this.toastr.info('Este es un mensaje informativo', 'Información');
    }
  
    showWarning() {
      // Usar ToastrService para mostrar una notificación de advertencia
      this.toastr.warning('Este es un mensaje de advertencia', 'Advertencia');
    }
  }
