import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUserModel } from 'app/models/loginUser.model';
import { UserModel } from '../../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  WEB_URL: string = environment.serverUrl;

  constructor(private http: HttpClient) { }
  
  createUser(userRegister: UserModel) {
    return this.http.post(this.WEB_URL +'/auth/signup', userRegister);
  }

  getUsers() {
    return this.http.get(this.WEB_URL +'/auth');
  }

  getUserFind(correo: string) {
    return this.http.get(this.WEB_URL +'/auth/'+ correo);
  }

  login(loginUser: LoginUserModel) {
    return this.http.post(this.WEB_URL +'/auth/singin', loginUser);
  }

  putProjectUser(id: any, data){
    return this.http.put(this.WEB_URL +'/auth/proyectos/'+ id, data);
  }

  getNotification(){
    return this.http.get(this.WEB_URL +'/notification');
  }

  createNotification(notification){
    console.log(notification);
    return this.http.post(this.WEB_URL +'/notification', notification);
  }

  deleteNotification(id: any) {
    return this.http.delete(this.WEB_URL + '/notification/' + id )
  }

  postCodigosAutorizacion(codigo){
    console.log(codigo);
    
    return this.http.post(this.WEB_URL +'/authorization', {codigo});
  }

  getCodigosAutorizacion(){
    return this.http.get(this.WEB_URL +'/authorization');
  }
}
