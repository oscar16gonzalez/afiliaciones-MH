import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUserModel } from 'app/models/loginUser.model';
import { UserModel } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  
  createUser(userRegister: UserModel) {
    return this.http.post('http://54.81.127.92:3000/auth/signup', userRegister);
  }

  getUsers() {
    return this.http.get('http://54.81.127.92:3000/auth');
  }

  getUserFind(correo: string) {
    return this.http.get('http://54.81.127.92:3000/auth/'+ correo);
  }

  login(loginUser: LoginUserModel) {
    console.log(loginUser);
    return this.http.post('http://54.81.127.92:3000/auth/singin', loginUser);
  }

  putProjectUser(id: any, data){
    return this.http.put('http://54.81.127.92:3000/auth/proyectos/'+ id, data);
  }

  getNotification(){
    return this.http.get('http://54.81.127.92:3000/notification');
  }

  createNotification(notification){
    console.log(notification);
    return this.http.post('http://54.81.127.92:3000/notification', notification);
  }
}
