import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MembershipService } from 'app/services/membership/membership.service';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import * as alertify from 'alertify.js';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DocumentsService } from 'app/services/documents.service';
import { ContractsService } from '../../services/contract/contracts.service';
import { ContratoService } from 'app/services/contrato/contrato.service';

@Component({
  selector: 'app-modal-info-membership',
  templateUrl: './modal-info-membership.component.html',
  styleUrls: ['./modal-info-membership.component.css']
})
export class ModalInfoMembershipComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  nameUser: any;
  responseDataUserInfo: any = '';
  imageData;
  infoUser: any;
  infoProject: any;


  constructor(
    private _bottomSheet: MatBottomSheet, @Inject(MAT_DIALOG_DATA) 
    public data: any, 
    private membershipService: MembershipService, 
    private projectService: ContractsService,
    private documentService: DocumentsService, 
    private router: Router, @Inject(DOCUMENT) 
    private document: Document,
    private service_contract: ContratoService) { }
  

  ngOnInit(): void {
    console.log(this.data);

    this.membershipService.getUserFind(this.data.cedula).subscribe(response => {
      this.infoUser = response;
      this.nameUser = response[0].nombre
      this.responseDataUserInfo = response[0];
    })

  }

  fileSelected(event: Event) {
  
    const file = (event.target as HTMLInputElement).files[0];
    const fileTypes = ["image/png", "image/jpeg", "image/jpg"]
    if (file && fileTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      }
      reader.readAsDataURL(file);
    }
  }

  modilePhone(){
    alertify.alert("This is an alert dialog.");
  }

  changeState() {
    const data = {
      estado: 'afiliado'
    }
    this.membershipService.putMemberShipState(this.responseDataUserInfo._id, data).subscribe(data => {
      console.log("data-----", data);

    })
  }

  changeStateExamenMedico() {
    const data = {
      estado: 'afiliado_pendiente_examen_medico'
    }
    this.membershipService.putMemberShipState(this.responseDataUserInfo._id, data).subscribe(data => {
      console.log("data-----", data);


    })
  }

  sendWhatsapp() {
    this.document.location.href = `https://api.whatsapp.com/send?phone=+57${this.responseDataUserInfo.celular}&text=Hola%2C%20${this.nameUser}%20${this.responseDataUserInfo.apellido}%20ya%20te%20encuentras%20listo%20para%20comenzar%20a%20trabajar%20con%20la%20empresa%20----%20preséntate%20el%20dia%20(fecha%20de%20inicio)%2014/07/2022.`
  }

  sendEmail() {
    this.document.location.href = `mailto:${this.responseDataUserInfo.correo}.com?subject=Notificación%20de%20Ingreso%3A%20&body=Hola%2C%20${this.nameUser}%20${this.responseDataUserInfo.apellido}%20ya%20te%20encuentras%20listo%20para%20comenzar%20a%20trabajar%20con%20la%20empresa%20----%20preséntate%20el%20dia%20(fecha%20de%20inicio)%2014/07/2022.`
  }


  sendSms() {
    console.log('send');
    this.membershipService.getSMS(this.responseDataUserInfo.nombre, this.responseDataUserInfo.celular).subscribe(data => {
      console.log("data-----", data);
      if (data['message'] === 'OK') {
        alert('Mensaje enviado ')
      }
    })
  }

  retirar(){
    this.consultProject();

  }

  consultProject(){
    this.projectService.getProjectsId(this.infoUser[0].proyectos).subscribe((data: any)=>{
      this.infoProject = data;
      this.documentService.createRenuncia(this.infoUser,this.infoProject);
      this.documentService.createPaz_y_Salvo(this.infoUser,this.infoProject);
      this.documentService.createExamenEgreso(this.infoUser,this.infoProject);
      this.userRetired();      
    })
  }

  generateContract(){
    this.projectService.getProjectsId(this.infoUser[0].proyectos).subscribe((data: any)=>{
    this.infoProject = data;
    this.service_contract.cretateContract(this.infoUser,this.infoProject)
  })

  }
  
  // openDoc() {
  //   console.log('Aqui esta abriendo el documento', this.responseDataUserInfo)
  //   window.open('https://facebook.com/', '_blank')
  // }

  userRetired() {
    const data = {
      estado: 'retirado'
    }
    this.membershipService.putMemberShipState(this.responseDataUserInfo._id, data).subscribe(data => {
    })
  }

}
