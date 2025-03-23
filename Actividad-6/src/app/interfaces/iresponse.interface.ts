import { IUsuario } from "./iusuario.interface";

export interface IResponse {
  page: number;
  total_pages: number;
  results: IUsuario[]; // Asegúrate de que `IUsuario` esté correctamente importado
}


