import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalInfoMembershipComponent } from 'app/modals/modal-info-membership/modal-info-membership.component';
import { ContractsService } from 'app/services/contract/contracts.service';
import { ExporterService } from 'app/services/export-excel/exporter.service';
import { MembershipService } from 'app/services/membership/membership.service';
import { NominaService } from 'app/services/nomina/nomina.service';

@Component({
  selector: 'app-info-projects',
  templateUrl: './info-projects.component.html',
  styleUrls: ['./info-projects.component.css']
})
export class InfoProjectsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  infoProject: any = [];
  dataUserMembership: any = [];
  listAdmin = [];
  listResident = [];
  dataUser;
  myAngularxQrCode;
  formPutUser: FormGroup
  today = new Date();
  pipe = new DatePipe('en-US');
  disabled: boolean = true;
  Fecha = this.pipe.transform(Date.now(), 'dd/MM/yyyy')
  QR = false;


  listaAfiliados = [];
  listaAfiliados1 = [];
  listaRetirados = [];
  listaNomina = [];
 

  constructor(private fb: FormBuilder,
    private contract_service: ContractsService,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public membershipService: MembershipService,
    public nominaService: NominaService,
    public dialog: MatDialog,
    public exportService: ExporterService) { }

  ngOnInit(): void {
    this.createFrom()
    this.contract_service.getProjectsId(this.data.id).subscribe(data => {
      this.infoProject = data;
      this.dataUser = JSON.parse(localStorage.getItem('infoUser'));
      this.projectsFindId(false);
    })
  }


  createFrom() {
    this.formPutUser = this.fb.group({
      dias_laborados: ['']
    })
  }

  projectsFindId(state) {
    this.membershipService.getMembership().subscribe(

      (data) => {
        this.dataUserMembership = [];
        this.dataUserMembership = data;
        for (let index = 0; index < this.dataUserMembership.length; index++) {
          const elementInfo = this.dataUserMembership[index]
          const element = this.dataUserMembership[index].proyectos;

          if (element === this.data.id) {
            this.listAdmin.push(elementInfo)
          }
        }
        this.dataUserMembership = this.listAdmin;
       
        this.separarlista();
        if(state){
          this.generateNomina();
        }
      })

  }

  separarlista() {

     this.dataUserMembership.forEach(item => {
        if (item.estado != 'retirado') {
          this.listaAfiliados.push(item);
        } else if (item.estado === 'retirado') {
          this.listaRetirados.push(item);
        }
      });

      this.listaAfiliados.forEach(item => {
        if (item.estado === 'afiliado') {
          this.listaNomina.push(item);
          
        }
      })
   
    console.log("separar", this.listaNomina);
  }

  generateQR() {
    this.QR = true;
    this.myAngularxQrCode = (`https://api.whatsapp.com/send?phone=+573128502119&text=DATOS%20FACTURCIÓN%20ELECTRONICA:%0A%0A%20NIT:%20%20${this.infoProject.nit}%0A%0A%20REPRESENTANTE%20LEGAL:%20%20${this.infoProject.nombre_rep_legal}%0A%0A%20CEDULA%20REPRESENTANTE%LEGAL:%20%20${this.infoProject.cedula_rep_legal}%0A%0A%20ENTIDAD%20CONTRATANTE:%20%20${this.infoProject.entidad}%0A%0A%20DEPARTAMENTO:%20%20${this.infoProject.departamento}%0A%20MUNICIPIO:%20%20${this.infoProject.municipio}`)
  }

  url(url) {
    window.open(url)
  }

  // getMembership() {
  //   this.membershipService.getMembership().subscribe((data: any) => {
  //     this.listResident = data; this.dataUserMembership = this.listResident; console.log("LISTA ", this.dataUserMembership);
  //   })
  // }

  openDialog(cedula) {

    const dialogRef = this.dialog.open(ModalInfoMembershipComponent, {
      width: '1200px',
      data: { cedula }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.listAdmin = [];
        this.listResident = [];
        this.projectsFindId(false);
      }
    });
  }

  exportAsXLSX() {
    this.exportService.exportToExcel(this.dataUserMembership, 'info_afiliados');
  }

  save(id: string) {

    const attendenceUser = {
      dias_laborados:
        this.formPutUser.value.dias_laborados
    }

    this.membershipService.putUserDiasLaborados(id, attendenceUser).subscribe((data: any) => {
      // alertify.success('Dias ingresados con exito.');

      this.listaNomina.forEach((element, index) => {
        if (element._id === id) this.listaNomina.splice(index, 1);
        // this.listaNomina_.push(element)
      });
    })
  }

  generateNomina() {
    this.projectsFindId(true);
   
    console.log("ENVIA A SERVICIO LISTA NOMINA ", this.listaNomina);

   //return this.nominaService.generateNomina(this.listaNomina);
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


