import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './shared/nav.component';
import { NgxSonnerToaster} from 'ngx-sonner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, NgxSonnerToaster],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Friend Finder';
}
