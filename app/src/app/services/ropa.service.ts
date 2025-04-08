import { HttpClient } from '@angular/common/http';
import { inject, Inject,Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Ropa,RopaCreacion } from '../models/ropa.model';
import { Observable } from 'rxjs';
import { Console } from 'node:console';

@Injectable({
  providedIn: 'root'
})
export class RopaService {

  constructor() { }

  private http = inject(HttpClient);
  private URLbase = environment.apiURL + '/api/ropas'

  public obtenerTodos():Observable<Ropa[]>
  {
    return this.http.get<Ropa[]>(this.URLbase);
  }

  public obtenerPorCodigo(codigo: String): Observable<Ropa>
  {
    let res = this.http.get<Ropa>(`${this.URLbase}/${codigo}`);
    return res;
  }

  public crear(ropa:RopaCreacion)
  {
    console.log('EN SERVICE',ropa)
    return this.http.post(this.URLbase,ropa);
  }

  public actualizar(codigo:String, ropa: RopaCreacion)
  {
    console.log(this.URLbase+'/'+codigo)
    return this.http.put(`${this.URLbase}/${codigo}`,ropa);
  }

  public borrar(codigo: String)
  {
    return this.http.delete(`${this.URLbase}/${codigo}`);
  }
}
