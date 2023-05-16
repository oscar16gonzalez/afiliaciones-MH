import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfMake';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  date = new Date('Julio 12 2011');
  fecha;
  docsRetiro: any = []
  diferenciaDias;

  constructor() {
    this.fecha = this.pipe.transform(Date.now(), 'dd/MM/yyyy')
  }



  createPaz_y_Salvo(infoUser, infoProject, fecha_retiro) {
    this.fecha = this.pipe.transform(fecha_retiro, 'dd/MM/yyyy')

    const PAZ_Y_SALVO = {
      content: [
        {
          stack: [
            'PAZ Y SALVO',

          ],
          style: 'header'
        },
        {
          text: [

            `${infoUser[0].nombre} ${infoUser[0].apellido}, identificado con cédula de ciudadanía No.${infoUser[0].cedula}, certifico que el ${infoProject.contratista} con Nit ${infoProject.nit} se encuentra a PAZ Y SALVO por todo concepto concerniente a (PAGOS LABORALES, PRESTACIONES, SEGURIDAD SOCIAL, PARAFISCALES, CAJAS DE COMPENSACIÓN Y PENSIÓN).`,
          ],
          style: 'texto'
        },
        ,

        {
          text: [
            `Para constancia se firma en el Municipio de ${infoProject.municipio}, ${infoProject.departamento} en la fecha ${this.fecha} `,
          ],
          style: 'texto2'
        },
        {
          text: [
            'Atentamente,',
          ],
          style: 'texto2'
        },
        {
          width: '70%',
          style: 'firma',
          type: 'none',
          ul: [
            '____________________________',
            `FIRMA TRABAJADOR `,
            `NOMBRE: ${infoUser[0].nombre} `,
            `CEDULA: ${infoUser[0].cedula}`,
          ]
        },

      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [50, 150, 0, 0]
        },
        subheader: {
          fontSize: 14

        },
        superMargin: {
          margin: [50, 0, 0, 0],
          fontSize: 14
        },
        subtitulo: {
          bold: true,
          margin: [50, 40, 0, 30],
          fontSize: 13
        },
        texto: {
          margin: [50, 40, 50, 50],
          fontSize: 12,
          alignment: 'justify'

        },
        texto2: {
          margin: [50, 0, 50, 50],
          fontSize: 12
        },
        sub: {
          fontSize: 14,
          bold: false
        },
        firma: {
          fontSize: 12,
          margin: [50, 50, 10, 0],

        }
      }
    }
    const pdf_Paz_Y_SALVO = pdfMake.createPdf(PAZ_Y_SALVO);
    pdf_Paz_Y_SALVO.open();
  }

  createExamenEgreso(infoUser, infoProject, fecha_retiro) {
    this.fecha = this.pipe.transform(fecha_retiro, 'dd/MM/yyyy')

    const EXAMEN_EGRESO = {
      content: [
        {
          stack: [
            `${infoProject.municipio} ${this, this.fecha}`,

          ],
          style: 'header'
        },
        {
          stack: [
            'Señor',

          ],
          style: 'header'
        },
        {
          stack: [
            `${infoUser[0].nombre} ${infoUser[0].apellido}`,

          ],
          style: 'header'
        },
        {
          stack: [
            `${infoProject.municipio} - ${infoProject.departamento}`,

          ],
          style: 'header'
        },
        {
          stack: [
            'ASUNTO: ORDEN EXAMEN DE EGRESO',

          ],
          style: 'header2'
        },
        {
          text: [
            `De conformidad con la Resolución 2346 de 2007, que regula las evaluaciones médicas ocupacionales. ${infoProject.contratista}, le autoriza practicarse el examen médico ocupacional de egreso. En la siguiente institución prestadora de servicios de salud PASSOMET.`,
          ],
          style: 'texto'
        },

        {
          text: [
            'Para solicitar su cita debe tener en cuenta la siguiente información:',
          ],
          style: 'texto2'
        },
        {

          ul: [
            'El horario de atención es 7 am a 6 pm',
            'La cita debe ser solicitada en el teléfono 3008574554 ',
            'Dirección: Cra 23 #25-32 of 104',
            'Al momento del examen, presentar el documento de identidad.',
          ],
          style: 'texto3'
        },
        {
          type: 'none',
          style: 'firma',
          ul: [
            '__________________________________________',
            'FIRMA TRABAJADOR ',
            `NOMBRE: ${infoUser[0].nombre} ${infoUser[0].apellido}`,
          ]
        },
        {
          text: [
            'Nota 1: La orden tendrá cinco (5) días de validez a partir de la fecha de entrega, pasada la fecha es responsabilidad absoluta del portador. (Capítulo V artículo 57 Ord 7 C.S.T)'
          ],
          style: 'texto2'
        },
        {
          text: [
            'Nota 2: Para cualquier información se puede comunicar a los números de teléfonos 3008574554'
          ],
          style: 'texto4'
        },
        {
          text: [
            'Cordialmente,'
          ],
          style: 'texto2'
        },

        {
          width: '70%',
          style: 'firma2',
          type: 'none',
          ul: [
            '____________________________',
            'PROFESIONAL SST',
            'NOMBRE: ______________',
            'C.C: __________________ ',
          ]
        },

      ],
      styles: {
        header: {
          fontSize: 12,
          alignment: 'left',
          margin: [50, 20, 0, 0]
        },
        header2: {
          fontSize: 12,
          bold: true,
          alignment: 'center',
          margin: [50, 20, 0, 0]
        },
        subheader: {
          fontSize: 14

        },
        subtitulo: {
          bold: true,
          margin: [50, 40, 0, 30],
          fontSize: 13
        },
        texto: {
          margin: [50, 40, 50, 50],
          fontSize: 12,
          alignment: 'justify'

        },
        texto2: {
          margin: [50, 0, 0, 50],
          fontSize: 12
        },
        texto3: {
          margin: [70, 0, 0, 40],
          fontSize: 12,

        },
        texto4: {
          margin: [50, -40, 0, 10],
          fontSize: 12,

        },
        firma: {
          bold: true,
          fontSize: 12,
          margin: [150, 0, 0, 30],

        },
        firma2: {
          bold: true,
          fontSize: 12,
          margin: [50, 0, 0, 30],

        },
      }
    }
    const pdfEXAMEN_EGRESO = pdfMake.createPdf(EXAMEN_EGRESO);
    pdfEXAMEN_EGRESO.open();
  }

  createLiquidacion(infoUser, infoProject, fecha_retiro) {

    const fecha_ = infoUser[0].fecha_ingreso
    const fecha_ingreso = this.pipe.transform(fecha_, 'yyyy-MM-dd')
    this.fecha = this.pipe.transform(fecha_retiro, 'yyyy-MM-dd')
    const valorSubsidio = 140606;

    const fecha1 = new Date(this.fecha);
    const fecha2 = new Date(fecha_ingreso);

    this.functiondias360ExcelToJs(fecha2, fecha1, true);
    
    const diasLiquidar = this.diferenciaDias;
    const SalarioDebengado = (infoUser[0].salario);
    const salarioBase = (Number(SalarioDebengado) + Number(valorSubsidio));
    const cesantias = ((Number(salarioBase) / 360) * Number(diasLiquidar));
    const interesesCesantias = (((Number(cesantias) * 0.12) / 360) * Number(diasLiquidar));
    const primaServicios = ((Number(salarioBase) / 360) * Number(diasLiquidar));
    const vacaciones = ((Number(SalarioDebengado) / 720) * Number(diasLiquidar));
    const SubTotal = (Number(cesantias) + Number(interesesCesantias) + Number(primaServicios) + Number(vacaciones))


    const EXAMEN_EGRESO = {
      content: [
        {
          image: `${infoProject.logo}`,
          width: 70,
          height: 70,
          margin: [40, 0, 0, 0]
        },
        {
          text: `${infoProject.contratista}`,
          style: 'header',
          alignment: 'center'
        },
        {
          text: `NIT: ${infoProject.nit}`,
          style: 'header',
          alignment: 'center'
        },
        {
          text: ' LIQUIDACION DE PRESTACIONES SOCIALES',
          style: 'header',
          alignment: 'center'
        },
        {
          alignment: 'justify',
          columns: [
            {
              text: 'NOMBRE TRABAJADOR:',
              style: 'text'

            },
            {
              text: `${infoUser[0].nombre} ${infoUser[0].apellido}`
            }
          ], style: 'col1'
        },
        {
          alignment: 'justify',
          columns: [
            {
              text: 'CEDULA DE CIUDADANIA:',
              style: 'text'

            },
            {
              text: `${infoUser[0].cedula}`
            }
          ], style: 'col'
        },
        {
          alignment: 'justify',
          columns: [
            {
              text: 'CARGO:',
              style: 'text'

            },
            {
              text: `${infoUser[0].cargo}`
            }
          ], style: 'col'
        },
        {
          alignment: 'justify',
          columns: [
            {
              text: 'FECHA DE INGRESO:',
              style: 'text'

            },
            {
              text: `${fecha_ingreso}`
            }
          ], style: 'col'
        },
        {
          alignment: 'justify',
          columns: [
            {
              text: 'FECHA DE RETIRO:',
              style: 'text'

            },
            {
              text: `${this.fecha}`
            }
          ], style: 'col'
        },
        {
          alignment: 'justify',
          columns: [
            {
              text: 'No. DE DIAS TRABAJADOS:',
              style: 'text'

            },
            {
              text: `${diasLiquidar}`
            }
          ], style: 'col'
        },
        {
          alignment: 'justify',
          columns: [
            {
              text: 'DIAS A LIQUIDAR:',
              style: 'text'

            },
            {
              text: `${diasLiquidar}`
            }
          ], style: 'col'
        },
        {
          alignment: 'justify',
          columns: [
            {
              text: 'SALARIO DEVENGADO:',
              style: 'text'

            },
            {
              text: `$ ${SalarioDebengado.toLocaleString("en")}`
            }
          ], style: 'col'
        },
        {
          alignment: 'justify',
          columns: [
            {
              text: 'SUBSIDIO DE TRANSPORTE:',
              style: 'text'

            },
            {
              text: `$ ${valorSubsidio.toLocaleString("en")}`
            }
          ], style: 'col'
        },
        {
          alignment: 'justify',
          columns: [
            {
              text: 'SALARIO BASE DE LA LIQUIDACION:',
              style: 'text'

            },
            {
              text: `$ ${salarioBase.toLocaleString("en")}`
            }
          ], style: 'col'
        },
        {
          alignment: 'justify',
          columns: [
            {
              text: 'CESANTIA:',
              style: 'text'

            },
            {
              text: `$ ${cesantias.toLocaleString("en")}`
            }
          ], style: 'col1'
        },
        {
          alignment: 'justify',
          columns: [
            {
              text: 'INTERESES A LA CESANTIA:',
              style: 'text'

            },
            {
              text: `$ ${interesesCesantias.toLocaleString("en")}`
            }
          ], style: 'col'
        },
        {
          alignment: 'justify',
          columns: [
            {
              text: 'PRIMA DE SERVICIOS:',
              style: 'text'

            },
            {
              text: `$ ${primaServicios.toLocaleString("en")}`
            }
          ], style: 'col'
        },
        {
          alignment: 'justify',
          columns: [
            {
              text: 'VACACIONES:',
              style: 'text'

            },
            {
              text: `$ ${vacaciones.toLocaleString("en")}`
            }
          ], style: 'col'
        },
        {
          alignment: 'justify',
          columns: [
            {
              text: 'TOTAL LIQUIDACION:',
              style: 'text'

            },
            {
              text: `$ ${SubTotal.toLocaleString("en")}`
            }
          ], style: 'col1'
        },
        {
          alignment: 'justify',
          columns: [
            {
              text: 'NETO A PAGAR:',
              style: 'text'

            },
            {
              text: `$ ${SubTotal.toLocaleString("en")}`
            }
          ], style: 'col1'
        },
        {
          text: `DECLARO ESTAR A PAZ Y SALVO POR TODO CONCEPTO DE SALARIOS Y PRESTACIONES SOCIALES CON ${infoProject.nombre_rep_legal} A la fecha ${this.fecha}`,
          fontSize: 12,
          bold: true,
          alignment: 'justify',
          margin: [20, 35, 0, 0]
        },
        {
          alignment: 'justify',
          columns: [
            {
              text: '___________________________',
              style: 'text'

            },
            {
              text: '___________________________'
            }
          ], style: 'col2'
        },
        {
          alignment: 'justify',
          columns: [
            {
              text: 'EL TRABAJADOR',
              style: 'text'

            },
            {
              text: 'EL EMPLEADOR'
            }
          ], style: 'col'
        },

        {
          alignment: 'justify',
          columns: [
            {
              text: `${infoProject.municipio},`,
              style: 'text'

            },
            {
              text: `${this.fecha}`
            }
          ], style: 'col3'
        },

      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'justify'
        },
        text: {
          bold: true
        },
        col: {
          margin: [30, 8, 0, 0]
        },
        col1: {
          margin: [30, 25, 0, 0]
        },
        col2: {
          margin: [30, 55, 0, 0]
        },
        col3: {
          margin: [30, 30, 0, 0]
        }
      },
      defaultStyle: {
        columnGap: 20
      }
    }
    const pdfEXAMEN_EGRESO = pdfMake.createPdf(EXAMEN_EGRESO);
    pdfEXAMEN_EGRESO.open();
  }

  createRenuncia(infoUser, infoProject, fecha_retiro) {
    this.fecha = this.pipe.transform(fecha_retiro, 'dd/MM/yyyy')
    const RENUNCIA = {
      content: [
        {
          stack: [
            `${infoProject.municipio} ${this.fecha}`,

          ],
          style: 'header'
        },
        {
          stack: [
            'SEÑORES',
            { text: `${infoProject.contratista}`, style: 'subheader' },
            { text: `${infoProject.municipio}`, style: 'sub' },
          ],
          style: 'subtitulo'
        },
        {
          stack: [
            'ASUNTO: RENUNCIA',

          ],
          style: 'subtitulo'
        },
        {
          text: [
            `Por medio de la presente me permito presentar mi renuncia voluntaria a partir del ${this.fecha} al cargo que vengo desempeñando como ${infoUser[0].cargo}.`,
          ],
          style: 'texto'
        },
        {
          width: '70%',
          style: 'firma',
          type: 'none',
          ul: [
            '______________________________',
            'FIRMA TRABAJADOR ',
            `NOMBRE:  ${infoUser[0].nombre} ${infoUser[0].apellido}`,
            `CEDULA:  ${infoUser[0].cedula}`,
          ]
        },
      ],
      styles: {
        header: {
          fontSize: 14,
          alignment: 'left',
          margin: [50, 40, 0, 0]
        },
        subheader: {
          fontSize: 14

        },
        superMargin: {
          margin: [50, 0, 0, 0],
          fontSize: 14
        },
        subtitulo: {
          bold: true,
          margin: [50, 40, 0, 30],
          fontSize: 13
        },
        texto: {
          margin: [50, 0, 30, 0],
          fontSize: 12
        },
        sub: {
          fontSize: 14,
          bold: false
        },
        firma: {
          fontSize: 12,
          margin: [50, 50, 10, 0],

        }
      }
    }
    const pdfRENUNCIA = pdfMake.createPdf(RENUNCIA);
    pdfRENUNCIA.open();
  }


  functiondias360ExcelToJs(fechaInicial, fechaFinal, metodo) {
    var diaInicial = fechaInicial.getDate();
    var mesInicial = fechaInicial.getMonth() + 1;
    var anioInicial = fechaInicial.getFullYear();
    var diaFinal = fechaFinal.getDate();
    var mesFinal = fechaFinal.getMonth() + 1;
    var anioFinal = fechaFinal.getFullYear();

    if (diaFinal == 31) {
      diaFinal = 30;
    }

    if (metodo == true) {
      if (diaInicial == 31) {
        diaInicial = 30;
      }
      if (diaFinal == 30 && mesFinal == 2) {
        diaFinal = 31;
      }
      if (diaInicial == 30 && mesInicial == 2) {
        diaInicial = 31;
      }
    }
    this.diferenciaDias = ((anioFinal - anioInicial) * 360) + ((mesFinal - mesInicial) * 30) + (diaFinal - diaInicial) + 1;
  }

}