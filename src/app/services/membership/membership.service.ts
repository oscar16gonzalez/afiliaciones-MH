import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MembershipModel } from 'app/models/membership.model';
import { environment } from '../../../environments/environment';
import { json } from 'express';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  WEB_URL: string = environment.serverUrl;

  constructor(private http: HttpClient) { }
  
  createMembership(membershipRegister: MembershipModel) {
    return this.http.post(this.WEB_URL +'/afiliacion/', membershipRegister);
  }

  getMembership() {
    return this.http.get(this.WEB_URL +'/afiliacion/');
  }

  getUserFind(cedula: number) {
    return this.http.get(this.WEB_URL +'/afiliacion/'+ cedula);
  }

  getSMS(nombre, celular) {
    const cel = JSON.stringify(celular)
    console.log("antes de enviar sms", nombre , cel);
    
    return this.http.get(this.WEB_URL +`/afiliacion/${nombre}/${celular}`);
  }

  putMemberShipState(id: string, data){
    console.log("cambiar");
    return this.http.put(this.WEB_URL +'/afiliacion/estado/'+ id, data);
  }

  putAttendanceUser(id: string, data){
    console.log("Attendance");
    console.log(data);
    
    return this.http.put(this.WEB_URL +'/afiliacion/asistencia/'+ id, data);
  }

  putDatos(id: string, data) {
    console.log(data);
    
    return this.http.put(this.WEB_URL + '/afiliacion/datos/'+ id, data)
  }
}