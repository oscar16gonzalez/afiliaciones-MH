import { runInThisContext } from "vm";

export class MembershipModel {
        //DATOS BASICOS
        cedula: number;
        apellido: string;
        nombre: string;
        genero: string
        fecha_nacimiento: string;

        //DATOS DE NOTIFICACION
        direccion: string;
        correo: string;
        celular: number;
        telefono: number;
        nombre_emergencia: string;
        celular_emergencia: number;
        whatsapp: string;
        telegram: string;

        //DATOS TRABAJADOR
        fecha_ingreso: string;
        curso_alturas: string;
        rut: string;
        examen_ingreso: string;
        cargo: string;
        salario: number;

        //DATOS AFILIACION
        eps: string;
        arl: string;
        fondo_pensiones: string;
        caja_compensacion: string;
        cesantias: string;

        //DATOS BANCARIOS
        entidad_bancaria: string;
        numero_cuenta: string;
        estado: string;
        foto: string;
        proyectos: string;
        asistencia: object;

        // DATOS QUE NO VAN 
        // contratista: string;
        // contrato: string;
        // departamento: string;
        // municipio: string;


        constructor() {
                // this.estado = 'pendiente_examen_medico';
                // this.asistencia = [
                //         {
                //                 "fecha": "",
                //                 "asistencia": ""
                //         }
                // ]
        }
}