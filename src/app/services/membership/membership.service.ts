import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MembershipModel } from 'app/models/membership.model';
import { json } from 'express';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  constructor(private http: HttpClient) { }
  
  createMembership(membershipRegister: MembershipModel) {
    return this.http.post('http://54.81.127.92:3000/afiliacion/', membershipRegister);
  }

  getMembership() {
    return this.http.get('http://54.81.127.92:3000/afiliacion/');
  }

  getUserFind(cedula: number) {
    return this.http.get(' http://54.81.127.92:3000/afiliacion/'+ cedula);
  }

  getSMS(nombre, celular) {
    const cel = JSON.stringify(celular)
    console.log("antes de enviar sms", nombre , cel);
    
    return this.http.get(`http://54.81.127.92:3000/afiliacion/${nombre}/${celular}`);
  }

  putMemberShipState(id: string, data){
    console.log("cambiar");
    return this.http.put(' http://54.81.127.92:3000/afiliacion/estado/'+ id, data);
  }

  putAttendanceUser(id: string, data){
    console.log("Attendance");
    console.log(data);
    
    return this.http.put(' http://54.81.127.92:3000/afiliacion/asistencia/'+ id, data);
  }
}