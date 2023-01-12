import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/users.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as alertify from 'alertify.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;


  constructor(private fb: FormBuilder, private loginService: UserService, private router: Router) { }

  ngOnInit() {
    this.createFrom();
  }

  createFrom() {
    this.formLogin = this.fb.group({
      correo: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ingresar() {
    this.loginService.login(this.formLogin.value).subscribe(
      data => {
        console.log("respuesta data",data)
        if (data == "Successfuly") {
          localStorage.setItem('token', data['token'])
          localStorage.setItem('correo', this.formLogin.value.correo)
          alertify.success('Inicio de sesion con exito');
          this.setUserSession();

        } else {
         
          alertify.alert('El usuario ingresado no existe', function () { alertify.error('Error en inicio de sesion '); });
        }

      }
    )
  }

  setUserSession() {
    this.loginService.getUserFind(this.formLogin.value.correo).subscribe(data => {
      console.log(data);
      
      localStorage.setItem('infoUser', JSON.stringify(data[0]))
      this.router.navigate(['/dashboard'])
    })
  }

}
