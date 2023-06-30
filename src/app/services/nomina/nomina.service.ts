import { Injectable } from '@angular/core';
import { ExporterService } from '../export-excel/exporter.service';

@Injectable({
  providedIn: 'root'
})
export class NominaService {

  DiasLaborados;
  SubTotal;
  subsidioTransporte;
  R = 9.46789;
  listExcel: any = [];


  constructor(private exportService: ExporterService) { }

  generateNomina(lista_nomina){
    console.log("LLEGA A SERVICIO LISTA NOMINA ", lista_nomina);
    
    const valorSubsidio = 140606;
    const SalarioMinimo = 1160000;
    
    // const HoraExtraDiurna = 0.25;
    // const TrabajoNocturno = 0.35;

    for (let index = 0; index < lista_nomina.length; index++) {

      lista_nomina[index].dias_laborados === 0 ? this.DiasLaborados = 0 : this.DiasLaborados = lista_nomina[index].dias_laborados;

      const SalarioDevengado = (lista_nomina[index].salario / 30) * this.DiasLaborados;
      const SalarioMayorMinimo = (Number(SalarioMinimo) * 2)
      const DescuentoPension = (Number(SalarioDevengado)) * 0.04
      const DescuentoSalud = (Number(SalarioDevengado)) * 0.04

      if (lista_nomina[index].salario >= SalarioMayorMinimo) {
        
        
        this.SubTotal = (Number(SalarioDevengado))
        this.subsidioTransporte = 0;

      } else {
        this.subsidioTransporte = (Number(valorSubsidio) / 30) * this.DiasLaborados;

        this.SubTotal = (Number(SalarioDevengado) + Number(this.subsidioTransporte))
      }
      const Descuentos = (Number(DescuentoSalud) + Number(DescuentoPension))
      const TotalSalario = Number(this.SubTotal) - Number(Descuentos)


      const objetcListExcelNomina = {
        "Cedula": lista_nomina[index].cedula,
        "Nombre y Apellidos": lista_nomina[index].nombre.toUpperCase() + lista_nomina[index].apellido.toUpperCase(),
        "Cargo": lista_nomina[index].cargo,
        "Salario": Number(lista_nomina[index].salario),
        "Dias Laborados": Number(this.DiasLaborados),
        "Salario Devengado": this.DiasLaborados !== 0 ? Number(SalarioDevengado) : 0,
        "Subsidio Transporte": Number(this.subsidioTransporte),
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
