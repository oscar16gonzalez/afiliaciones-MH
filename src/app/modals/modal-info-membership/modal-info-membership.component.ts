import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MembershipService } from 'app/services/membership/membership.service';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { DatePipe, DOCUMENT } from '@angular/common';
import * as alertify from 'alertify.js';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DocumentsService } from 'app/services/documents.service';
import { ContractsService } from '../../services/contract/contracts.service';
import { ContratoService } from 'app/services/contrato/contrato.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmComponent } from '../modal-comfirm/modal-confirm/modal-confirm.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypographyComponent } from 'app/page/typography/typography.component';

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
  mostrar = true
  formEditMembership: FormGroup;
  today: Date = new Date()
  pipe = new DatePipe('en-US')
  info = false
  Fecha = this.pipe.transform(Date.now(), 'dd/MM/yyyy')


  constructor(
    private _bottomSheet: MatBottomSheet, @Inject(MAT_DIALOG_DATA)
    public data: any,
    private membershipService: MembershipService,
    private projectService: ContractsService,
    private documentService: DocumentsService,
    private router: Router, @Inject(DOCUMENT)
    private document: Document,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private service_contract: ContratoService) { }


  ngOnInit(): void {
   
    this.getFindUser();
    this.cargarForm()

  }


  cargarForm() {
    this.formEditMembership = this.formBuilder.group({
      rut: ['', Validators.required],
      eps: ['', Validators.required],
      curso_alturas: ['', Validators.required],
      arl: ['', Validators.required],
      examen_ingreso: ['', Validators.required],
      fondo_pensiones: ['', Validators.required],
      fonod_cesantias: ['', Validators.required],
      numero_cuenta: ['', Validators.required],
      entidad_bancaria: ['', Validators.required],

    })
  }

  EditMembership() {
    
    this.membershipService.putDatos(this.responseDataUserInfo._id, this.formEditMembership.value).subscribe((data) => {
     
      this.validarInfo()

    })
   
  }

  getFindUser() {
    this.membershipService.getUserFind(this.data.cedula).subscribe(response => {
      this.infoUser = response;
      this.nameUser = response[0].nombre
      this.responseDataUserInfo = response[0];
      this.validarInfo()
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

  modilePhone() {
    alertify.alert("This is an alert dialog.");
  }

  changeState(state) {
    const data = {
      estado: state

    }

    this.membershipService.putMemberShipState(this.responseDataUserInfo._id, data).subscribe(data => {
      alertify.success('Se guardo con exito');
      this.getFindUser();
    })
  }

  chageFechaRetiro() {
    const data = {
      fecha_retiro: this.pipe.transform(Date.now(), 'yyyy-MM-dd')
    }

    this.membershipService.putFechaRetiro(this.responseDataUserInfo._id, data).subscribe(data => {
     
    })
  }



  respuesta() {
    alertify.success('Ok');
  }
  sendWhatsapp() {
    window.open(`https://api.whatsapp.com/send?phone=+57${this.responseDataUserInfo.celular}&text=Hola%2C%20${this.nameUser}%20${this.responseDataUserInfo.apellido}%20ya%20te%20encuentras%20listo%20para%20comenzar%20a%20trabajar%20con%20la%20empresa%20----%20preséntate%20el%20dia%20(fecha%20de%20inicio)%2014/07/2022.`)
  }

  sendEmail() {
    window.open(`mailto:${this.responseDataUserInfo.correo}.com?subject=Notificación%20de%20Ingreso%3A%20&body=Hola%2C%20${this.nameUser}%20${this.responseDataUserInfo.apellido}%20ya%20te%20encuentras%20listo%20para%20comenzar%20a%20trabajar%20con%20la%20empresa%20----%20preséntate%20el%20dia%20(fecha%20de%20inicio)%2014/07/2022.`)
  }


  sendSms() {
    this.membershipService.getSMS(this.responseDataUserInfo.nombre, this.responseDataUserInfo.celular).subscribe(data => {
      if (data['message'] === 'OK') {
        alert('Mensaje enviado ')
      }
    })
  }

  retirar() {
    this.openDialogRetirar();

  }

  descargaDocRetiro() {
    this.consultProject();
  }

  openDialogRetirar() {

    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      height: '180px',
      width: '220px',
      data: `Estas seguro que deseas retiar el empleado ? ${this.Fecha}`
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.consultProject();
      }
    });
  }

  openDialogEditar() {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      height: '180px',
      width: '220px',
      data: 'Estas seguro que deseas editar esta informacion ?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.EditMembership();
      } else {
        this.getFindUser();
      }
    });
  }

  consultProject() {
    this.projectService.getProjectsId(this.infoUser[0].proyectos).subscribe((data: any) => {
      this.infoProject = data;
      this.documentService.createRenuncia(this.infoUser, this.infoProject);
      this.documentService.createPaz_y_Salvo(this.infoUser, this.infoProject);
      this.documentService.createExamenEgreso(this.infoUser, this.infoProject);
      this.documentService.createLiquidacion(this.infoUser, this.infoProject);
      this.chageFechaRetiro();
      this.changeState('retirado');
    })
  }



  generateContract() {
    this.projectService.getProjectsId(this.infoUser[0].proyectos).subscribe((data: any) => {
      this.infoProject = data;
      this.service_contract.cretateContract(this.infoUser, this.infoProject)
    })

  }

  openDialog() {

    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      height: '180px',
      width: '220px',
      data: 'Estas seguro que deseas afiliar el empleado sin examen medico?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.changeState('afiliado_pendiente_examen_medico')
      }
    });
  }

  editar() {
    this.mostrar = false
  }

  guardar() {
    this.mostrar = true;
    this.openDialogEditar();
  }

  validarInfo() {
    
    if (this.responseDataUserInfo.examen_ingreso === 'No' || this.responseDataUserInfo.curso_alturas === 'No' || this.responseDataUserInfo.rut === 'No' || this.responseDataUserInfo.eps === '' ||
      this.responseDataUserInfo.arl === '' || this.responseDataUserInfo.fondo_pensiones === '' || this.responseDataUserInfo.entidad_bancaria === '' || this.responseDataUserInfo.numero_cuenta === '') {
      this.info = true

      
    }else {
      this.info = false
    }

  }



}
