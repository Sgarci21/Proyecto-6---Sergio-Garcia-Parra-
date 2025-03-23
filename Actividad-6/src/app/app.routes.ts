import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsuariosService } from './services/usuarios.service';
import { NuevoUsuarioComponent } from './pages/new-usuario/new-usuario.component';
import { ActualizarUsuarioComponent } from './pages/update-usuario/update-usuario.component';
import { C404Component } from './components/c404/c404.component';
import { UsuarioViewComponent } from './pages/usuarios-view/usuarios-view.component';



export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "home"},
    { path: "home", component: HomeComponent },
    { path: "usuarios", component: UsuariosService },
    { path: "usuarios/:id", component: UsuarioViewComponent },
    { path: "nuevoUsuario", component: NuevoUsuarioComponent },
    { path: "actualizarUsuario/:id", component: ActualizarUsuarioComponent },
    { path: "**", component: C404Component },
];
