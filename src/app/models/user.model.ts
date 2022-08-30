export class UserModel {
         nombre: string;
         apellido: string;
         correo: string
         password: string;
         estado:boolean;
         celular: string;
         direccion: string;
         roles: string

        constructor(){
            this.estado = true;
        }
}
