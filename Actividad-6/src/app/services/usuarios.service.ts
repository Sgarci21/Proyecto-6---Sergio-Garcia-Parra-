import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IResponse } from '../interfaces/iresponse.interface';
import { lastValueFrom } from 'rxjs';
import { IUsuario } from '../interfaces/iusuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private httpClient = inject(HttpClient)
  private baseUrl: string = "https://peticiones.online/api/users"

  getAll(page: number =0): Promise<IResponse> {
    let url = (page === 0) ? this.baseUrl : this.baseUrl + `?page=${page}`
    return lastValueFrom(this.httpClient.get<IResponse>(url))
  }

  getById(id: string): Promise<IUsuario> {
    return lastValueFrom(this.httpClient.get<IUsuario>(`${this.baseUrl}/${id}`))
  }

  delete(id: string): Promise<IUsuario> {
    return lastValueFrom(this.httpClient.delete<IUsuario>(`${this.baseUrl}/${id}`))
  }

  constructor() { 
  }
}
