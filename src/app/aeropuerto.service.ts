import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Aeropuerto } from './interface/aeropuerto';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AeropuertoService {

  constructor(private http:HttpClient) { }

  baseUrl:string=""

  getAllAeropuertos():Observable<Aeropuerto[]>{
    return this.http.get<any>(`${this.baseUrl}/api/aeropuerto`);
  }

  postAeroperto(aeropuerto:Aeropuerto){
    return this.http.post(`${this.baseUrl}/api/aeropuerto`,aeropuerto);
  }

  putAeropuerto(aeropuerto:Aeropuerto){
    return this.http.put(`${this.baseUrl}/api/aeropuerto/${aeropuerto.iata}`,aeropuerto);
  } 

  deleteAeropuerto(id:string){
    return this.http.delete(`${this.baseUrl}/api/aeropuerto/${id}`);
  
  }
}
