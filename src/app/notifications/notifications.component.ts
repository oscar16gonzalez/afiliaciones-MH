import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../services/user/users.service';

import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { data } from 'jquery';

import * as alertify from 'alertify.js';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  formCreateMessage: FormGroup
  panelOpenState = false;
  listaUser = [];
  notification = [];
  _notificationDataMessage;
  mensaje = '';
  correo = '';
  selectedDevice
  colorStyle = ''
  idUser;
  listMessageReceived: any = [];
  listMessageSend: any = [];

  constructor(private fb: FormBuilder, private service_user: UserService, @Inject(DOCUMENT) private document: Document, private router: Router) { }
  showNotification(from, align) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      // icon: "notifications",
      // message: "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer."

    }, {
      type: type[color],
      timer: 4000,
      placement: {
        from: from,
        align: align
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }

  ngOnInit() {
    this.idUser = JSON.parse(localStorage.getItem('infoUser'));
    this.createFrom();
    this.service_user.getUsers().subscribe((data: any) => {
      console.log("INFO USUARIOS", data);
      this.listaUser = data;
    });

    this.notifications();


  }

  notifications() {
    this.service_user.getNotification().subscribe((data: any) => {
      console.log("INFO NOTIFICACIONES", data);
      this.notification = data;
      for (let index = 0; index < this.notification.length; index++) {
        const element = this.notification[index];
        console.log("ID", element.id_recibe);
        console.log("ID_", this.idUser._id);

        if (element.id_recibe === this.idUser._id) {
          this.listMessageReceived.push(element)
          console.log("********", this.listMessageReceived);
        } else if (element.id_envia === this.idUser._id) {
          this.listMessageSend.push(element);
        }
      }
    })
  }

  createFrom() {
    this.formCreateMessage = this.fb.group({
      users: [''],
      title: [''],
      message: [''],
      estado: [''],
      metodo: [''],

    });
  }

  createMessage() {
    console.log(this.formCreateMessage.valid);
    for (let index = 0; index < this.listaUser.length; index++) {
      const element = this.listaUser[index];
      if (element._id === this.formCreateMessage.value.users) {
        this._notificationDataMessage = {
          "nombre_envia": this.idUser.nombre,
          "nombre_recibe": this.listaUser[index].nombre,
          "mensaje": this.formCreateMessage.value.message,
          "asunto": this.formCreateMessage.value.title,
          "id_envia": this.idUser._id,
          "id_recibe": this.listaUser[index]._id,
          "estado": this.formCreateMessage.value.estado,
          "correo_envia": this.idUser.correo,
          "correo_recibe": this.listaUser[index].correo,
          "celular_recibe": this.listaUser[index].celular,
        }
        console.log(this._notificationDataMessage);
      }
    }

    this.service_user.createNotification(this._notificationDataMessage).subscribe((responseData: any) => {
      console.log("RESPUESTA CREACION NOTIFICACION", responseData);
      if (responseData.message == 'Notificacion successfuly saved') {
        if (this.formCreateMessage.value.metodo === 'correo') {
          window.open(`mailto:${this._notificationDataMessage.correo_recibe}?subject=${this._notificationDataMessage.asunto}%20%3A%20&body=${this._notificationDataMessage.mensaje}.`)
          alertify.alert('Mensaje enviado correctamente');
          
          // window.location.reload();
        } else if (this.formCreateMessage.value.metodo === 'whatsApp') {
          window.open(`https://api.whatsapp.com/send?phone=+57${this._notificationDataMessage.celular_recibe}&text=${this.formCreateMessage.value.message}.`)
          
          // window.location.reload();
        }
        // this.notifications();
      } else {
        alertify.alert('Error al crear el mensaje');
      }
      location.reload();
    });
  }

  deleteNotifications(id:string) {
    console.log('Id notificacion', id);
    this.service_user.deleteNotification(id).subscribe((data) => {
      console.log('Respuesta de las notificaciones', data);
      alertify.success('Notificacion eliminada con exito.');
      
    })
  }

  // sendWhatsapp() {
  //   this.document.location.href = `https://api.whatsapp.com/send?phone=+573128502119&text=${this.formCreateMessage.value.message}.`
  // }
}
