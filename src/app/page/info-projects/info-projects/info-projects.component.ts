import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalInfoMembershipComponent } from 'app/modals/modal-info-membership/modal-info-membership.component';
import { ContractsService } from 'app/services/contract/contracts.service';
import { ExporterService } from 'app/services/export-excel/exporter.service';
import { MembershipService } from 'app/services/membership/membership.service';

@Component({
  selector: 'app-info-projects',
  templateUrl: './info-projects.component.html',
  styleUrls: ['./info-projects.component.css']
})
export class InfoProjectsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  infoProject: any = [];
  dataUserMembership: any = [];
  listAdmin = [];
  listResident = [];
  dataUser;
  myAngularxQrCode;
  QR = false;

  constructor(private fb: FormBuilder,
              private contract_service: ContractsService, 
              @Inject(MAT_DIALOG_DATA) 
              public data: any, 
              public membershipService: MembershipService,
              public dialog: MatDialog,
              public exportService: ExporterService) { }

  ngOnInit(): void {





    this.contract_service.getProjectsId(this.data.id).subscribe(data => {
      this.infoProject = data;
      this.dataUser = JSON.parse(localStorage.getItem('infoUser'));



      this.projectsFindId();


    })

  }

  projectsFindId() {
    this.membershipService.getMembership().subscribe(

      (data) => {
        this.dataUserMembership = data;
        for (let index = 0; index < this.dataUserMembership.length; index++) {
          const elementInfo = this.dataUserMembership[index]
          const element = this.dataUserMembership[index].proyectos;


          if (element === this.data.id) {
            this.listAdmin.push(elementInfo)
          }
        }
        this.dataUserMembership = this.listAdmin;
        console.log("LISTA 1", this.infoProject);
      })
  }

  generateQR() {
    this.QR = true;
    this.myAngularxQrCode = (`https://api.whatsapp.com/send?phone=+573128502119&text=DATOS%20FACTURCIÓN%20ELECTRONICA:%0A%0A%20NIT:%20%20${this.infoProject.nit}%0A%0A%20REPRESENTANTE%20LEGAL:%20%20${this.infoProject.nombre_rep_legal}%0A%0A%20CEDULA%20REPRESENTANTE%LEGAL:%20%20${this.infoProject.cedula_rep_legal}%0A%0A%20ENTIDAD%20CONTRATANTE:%20%20${this.infoProject.entidad}%0A%0A%20DEPARTAMENTO:%20%20${this.infoProject.departamento}%0A%20MUNICIPIO:%20%20${this.infoProject.municipio}`)
  }

  url(url) {
    window.open(url)
  }

  getMembership() {
    this.membershipService.getMembership().subscribe((data: any) => {
      this.listResident = data; this.dataUserMembership = this.listResident; console.log("LISTA ", this.dataUserMembership);
    })
  }

  openDialog(cedula) {

    const dialogRef = this.dialog.open(ModalInfoMembershipComponent, {
      width: '1200px',
      data: { cedula }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.listAdmin = [];
        this.listResident = [];
        this.projectsFindId();
      }
    });
  }

  exportAsXLSX(){
    this.exportService.exportToExcel(this.dataUserMembership, 'info_afiliados');
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'ggggg', weight: 1.0079, symbol: '' },
  { position: 1, name: 'ggggg', weight: 1.0079, symbol: '' },
  { position: 1, name: 'ggggg', weight: 1.0079, symbol: '' },
  { position: 1, name: 'ggggg', weight: 1.0079, symbol: '' },
  { position: 1, name: 'ggggg', weight: 1.0079, symbol: '' },
  { position: 1, name: 'ggggg', weight: 1.0079, symbol: '' },
  { position: 1, name: 'ggggg', weight: 1.0079, symbol: '' },
  { position: 1, name: 'ggggg', weight: 1.0079, symbol: '' },
  { position: 1, name: 'ggggg', weight: 1.0079, symbol: '' },
  { position: 1, name: 'ggggg', weight: 1.0079, symbol: '' },
  { position: 1, name: 'ggggg', weight: 1.0079, symbol: '' }
];
