import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalInfoMembershipComponent } from 'app/modals/modal-info-membership/modal-info-membership.component';
import { ExporterService } from 'app/services/export-excel/exporter.service';
import { MembershipService } from 'app/services/membership/membership.service';
import { DOCUMENT } from '@angular/common';
import { TypographyComponent } from '../typography/typography.component';
import { CreateMembershipComponent } from '../create-membership/create-membership.component';
import { ContractsService } from '../../services/contract/contracts.service';


@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  dataUserMembership: any = [];
  dataUser;
  listAdmin = [];
  listResident = [];
  message = '';
  searchText = '';

  constructor(@Inject(DOCUMENT) private document: Document,
    public membershipService: MembershipService,
    public service_project: ContractsService,
    public dialog: MatDialog,
    public exportService: ExporterService) { }

  ngOnInit() {
    this.dataUser = JSON.parse(localStorage.getItem('infoUser'));
    this.consultRolUser();
    console.log(this.dataUser);
  }

  consultRolUser() {
    if (this.dataUser.roles === "Super Admin") {
      this.getMembership();
    } else {
      this.projectsFindId();
    }
  }

  Projects() {
    this.membershipService.getMembership().subscribe(data => {
      // this.dataContratc = data;
      console.log("ACA ADMIN", data);
    })
  }

  projectsFindId() {
    if (this.dataUser.proyectos !== '') {
      this.membershipService.getMembership().subscribe(

        (data) => {
          this.dataUserMembership = data;
          for (let index = 0; index < this.dataUserMembership.length; index++) {
            const elementInfo = this.dataUserMembership[index]
            const element = this.dataUserMembership[index].proyectos;
            if (element === this.dataUser.proyectos) {
              this.listAdmin.push(elementInfo)
            }
          }
          this.dataUserMembership = this.listAdmin;
          this.consultProjectUser();
        })
    }

  }

  consultProjectUser() {
    for (let index = 0; index < this.dataUserMembership.length; index++) {
      const element = this.dataUserMembership[index].proyectos;

      this.service_project.getProjectsId(element).subscribe((data: any) => {
        console.log(data);

      })
    }
  }

  getMembership() {
    this.membershipService.getMembership().subscribe((data: any) => {
      this.listResident = data;
      this.dataUserMembership = this.listResident;
      console.log("LISTA ", this.dataUserMembership);
    })
  }

  openDialog(cedula) {

    const dialogRef = this.dialog.open(ModalInfoMembershipComponent, {
      width: '1200px',
      data: { cedula }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result---: ${result}`);
      if (result === true) {
        this.listAdmin = [];
        this.listResident = [];
        this.consultRolUser();
      }
    });
  }

  exportAsXLSX() {
    this.exportService.exportToExcel(this.dataUserMembership, 'info_afiliados');
  }

  notification() {

    // this.document.location.href = `mailto:${this.dataUser.correo}?subject=Notificacion%20%3A%20&body=${this._notificationDataMessage.mensaje}.`
  }


  notifications(user): void {
    const dialogRef = this.dialog.open(TypographyComponent, {
      width: '300px',
      data: { message: this.message },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.message = result;
      if (result != undefined) {
        // this.document.location.href = `mailto:${user.correo}?subject=Notificacion%20%3A%20&body=${result}.`
        window.open(`https://api.whatsapp.com/send?phone=+57${user.celular}&text=${result}.`)
      }
    });
  }

  CreateMembership() {
    const dialogRef = this.dialog.open(CreateMembershipComponent, {
      width: '1200px',
      height: '900px'
      // data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        this.listAdmin = [],
          this.listResident = [],
          this.consultRolUser()
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log(`Dialog result: ${result}`);
    });
  }
}