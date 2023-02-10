import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user/users.service';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  formCreateUser: FormGroup;
  

  constructor(private fb: FormBuilder, private service_user: UserService) { }

  ngOnInit(): void {
    this.createFrom();
  }

  createFrom(){
      this.formCreateUser = this.fb.group({
        nombre: [''],
        apellido: [''],
        correo: [''],
        password: [''],
        celular: [''],
        direccion: [''],
        estado: [true],
        roles: [''],
        proyectos: [''],
      })
  }

  createUser() {
    this.service_user.createUser(this.formCreateUser.value).subscribe((data: any) => {
      console.log('RESPUSTA POS USUARIO', data);
      if(data.message = true){
        alertify.success('Usuario creado correctamente');
      }
      
    })
  }

}
