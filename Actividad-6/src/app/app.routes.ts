import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { NewUsuarioComponent } from './pages/new-usuario/new-usuario.component';
import { UpdateUsuarioComponent } from './pages/update-usuario/update-usuario.component';
import { C404Component } from './components/c404/c404.component';
import { UsuariosViewComponent } from './pages/usuarios-view/usuarios-view.component';



export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "home"},
    { path: "home", component: HomeComponent },
    { path: "usuarios", component: UsuariosComponent },
    { path: "usuarios/:id", component: UsuariosViewComponent },
    { path: "newUsuario", component: NewUsuarioComponent },
    { path: "updateusuario/:id", component: UpdateUsuarioComponent },
    { path: "**", component: C404Component },
];
