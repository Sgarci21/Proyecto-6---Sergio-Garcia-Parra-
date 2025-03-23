import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { UsuarioNuevoComponent } from './pages/usuario-nuevo/usuario-nuevo.component';
import { ActualizarUsuarioComponent } from './pages/actualizar-usuario/actualizar-usuario.component';
import { C404Component } from './components/c404/c404.component';
import { VistaUsuarioComponent } from './pages/vista-usuario/vista-usuario.component';



export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "home"},
    { path: "home", component: HomeComponent },
    { path: "usuarios", component: UsuariosComponent },
    { path: "usuarios/:id", component: VistaUsuarioComponent },
    { path: "nuevoUsuario", component: UsuarioNuevoComponent },
    { path: "actualizarUsuario/:id", component: ActualizarUsuarioComponent },
    { path: "**", component: C404Component },
];
