import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/users.service';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  dataUser;
  newCodigo;
  codigo;

  constructor(private user_service: UserService) { }

  ngOnInit() {
    this.dataUser = JSON.parse(localStorage.getItem('infoUser'));
    this.getCode();
  }
  getCode() {
    this.user_service.getCodigosAutorizacion().subscribe((data) => {
      this.codigo = data[0].codigo
    })
  }

  generateCode() {
    const aleatorio = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
    this.user_service.postCodigosAutorizacion(aleatorio).subscribe(data => {
      alertify.success('CODIGO GENERADO CON EXITO!');
      // window.location.reload()
      this.getCode();
    })
  }


}
