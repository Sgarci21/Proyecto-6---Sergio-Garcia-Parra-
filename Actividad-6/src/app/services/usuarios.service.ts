import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

export interface IUsuario {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface IResponse {
  page: number;
  total_pages: number;
  results: IUsuario[];
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private baseUrl: string = 'https://peticiones.online/api/users';

  constructor(private http: HttpClient) {}

  getAll(page: number = 0): Promise<IResponse> {
    const url = page === 0 ? this.baseUrl : `${this.baseUrl}?page=${page}`;
    return lastValueFrom(this.http.get<IResponse>(url));
  }

  getById(id: string): Promise<IUsuario> {
    return lastValueFrom(this.http.get<IUsuario>(`${this.baseUrl}/${id}`));
  }

  delete(id: string): Promise<IUsuario> {
    return lastValueFrom(this.http.delete<IUsuario>(`${this.baseUrl}/${id}`));
  }
}
