import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { servicio } from './servicio';

@Injectable({
  providedIn: 'root'
})
export class ConsumerServicesService {

  private frase: servicio = { value: "", icon_url: "", id: "", url: "" };

  constructor(private http: HttpClient) {}

  public getServicio(): Observable<servicio> {
    return this.http.get<servicio>(environment.URL_WS_BACKEND);
  }

  public postServicio(dato: string): Observable<servicio> {
    return this.http.post<servicio>(environment.URL_WS_BACKEND, dato);
  }


}
