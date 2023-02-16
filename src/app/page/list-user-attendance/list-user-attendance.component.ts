import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/users.service';
import { MembershipService } from 'app/services/membership/membership.service';
import { DatePipe } from '@angular/common';
import * as alertify from 'alertify.js';
import { ExporterService } from 'app/services/export-excel/exporter.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-list-user-attendance',
  templateUrl: './list-user-attendance.component.html',
  styleUrls: ['./list-user-attendance.component.css']
})
export class ListUserAttendanceComponent implements OnInit {
  today = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe = null;
  Fecha = this.pipe.transform(Date.now(), 'dd/MM/yyyy')
  dataUserSystem: any = [];
  asistenciaUser = [];
  listUserCentroTrabajo = [];
  listExcel: any = [];
  disabled: boolean = true;
  dataUser;
  DiasLaborados;
  direccion;
  formPutUser: FormGroup
  disabled_;

  constructor(private fb: FormBuilder,
    private user_data: MembershipService,
    private exportService: ExporterService) { }

  ngOnInit(): void {
    this.dataUser = JSON.parse(localStorage.getItem('infoUser'));
    this.createFrom();
    this.consultMembership(false);

  }


  consultMembership(state) {
    this.user_data.getMembership().subscribe((data: any[]) => {
      this.dataUserSystem = data;
      
      if (this.dataUser.roles === "Super Admin") {
        this.dataUserSystem = data;
      } else {
        for (let index = 0; index < this.dataUserSystem.length; index++) {
          const elementInfo = this.dataUserSystem[index]
          const element = this.dataUserSystem[index].proyectos;
          if (element === this.dataUser.proyectos) {
            this.listUserCentroTrabajo.push(elementInfo)

          }
        }
        this.dataUserSystem = this.listUserCentroTrabajo;
      }
      if(state){
        this.generateNomina();
      }
    })
  }

  createFrom() {
    this.formPutUser = this.fb.group({
      dias_laborados: ['']
    })
  }
  attendanceUser(id, asistenciasUser) {

    this.asistenciaUser.push(this.dataUserSystem[0].asistencia)
    const asist = this.asistenciaUser[0]

    const prueba = {
      "fecha": this.Fecha,
      "asistencia": "Si"
    }

    asist.push(prueba)
    const attendenceUser = {
      asistencia:
        asist
    }
    this.user_data.putAttendanceUser(id, attendenceUser).subscribe((data: any) => {
      console.log(data);
      // alertify.success('Asistencia generada con exito.');
      alertify.alert('Asistencia generada con exito.', function () { alertify.error('Ok'); });

    })
  }

  save(id: string) {

    const attendenceUser = {
      dias_laborados:
        this.formPutUser.value.dias_laborados
    }

    this.user_data.putUserDiasLaborados(id, attendenceUser).subscribe((data: any) => {
      alertify.success('Dias ingresados con exito.');
      
      this.dataUserSystem.forEach((element,index)=>{
        if(element._id === id) this.dataUserSystem.splice(index,1);
      });
    })
  }

  exportAsXLSX() {
    this.exportService.exportToExcel(this.dataUserSystem, 'info_afiliados');
  }

  generateNomina() {
    const valorSubsidio = 140606;
    const HoraExtraDiurna = 0.25;
    const TrabajoNocturno = 0.35;

    for (let index = 0; index < this.dataUserSystem.length; index++) {

      this.dataUserSystem[index].dias_laborados === 0 ? this.DiasLaborados = 0 : this.DiasLaborados = this.dataUserSystem[index].dias_laborados;

      const SalarioDebengado = (this.dataUserSystem[index].salario / 30) * this.DiasLaborados;
      const subsidioTransporte = (Number(valorSubsidio) / 30) * this.DiasLaborados;
      const DescuentoPension = (Number(SalarioDebengado)) * 0.04
      const DescuentoSalud = (Number(SalarioDebengado)) * 0.04
      const SubTotal = (Number(SalarioDebengado) + Number(subsidioTransporte))
      const Descuentos = (Number(DescuentoSalud) + Number(DescuentoPension))

      const TotalSalario = Number(SubTotal) - Number(Descuentos)


      const objetcListExcelNomina = {
        "Cedula": this.dataUserSystem[index].cedula,
        "Nombre y Apellidos": this.dataUserSystem[index].nombre + this.dataUserSystem[index].apellido,
        "Cargo": this.dataUserSystem[index].cargo,
        "Salario": Number(this.dataUserSystem[index].salario),
        "Dias Laborados": Number(this.DiasLaborados),
        "Salario Debengado": this.DiasLaborados !== 0 ? Number(SalarioDebengado) : 0,
        "Subsidio Transporte": Number(subsidioTransporte),
        "Descuento Pension": this.DiasLaborados !== 0 ? Number(DescuentoPension) : 0,
        "Descuento Salud": this.DiasLaborados !== 0 ? Number(DescuentoSalud) : 0,
        "Otros": 0,
        "Total Salario": this.DiasLaborados !== 0 ? Number(TotalSalario) : 0

      }

      this.listExcel.push(objetcListExcelNomina);
    }
    console.log(`Nomina -------`, this.listExcel);
    this.exportService.exportToExcel(this.listExcel, `Nomina del mes`);
    // this.consultMembership();
  }


}
