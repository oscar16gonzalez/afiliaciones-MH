import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MembershipService } from '../services/membership/membership.service';
import { UserService } from '../services/user/users.service';
import * as alertify from 'alertifyjs'

declare const google: any;

interface Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable?: boolean;
}
@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
    formValidateCode: FormGroup;

    listUserCheck: any = [];
    dataUser;
    codeAutorization;
    stateCodeAutorization = false;

    documnets = this._formBuilder.group({
        eps: [false, Validators.required],
        arl: [false, Validators.required],
        caja: [false, Validators.required],
        examem: [false, Validators.required],
        curso: [false, Validators.required],
        rut: [false, Validators.required],
        fondo: [false, Validators.required],
        induccion: [false, Validators.required],
        evaluacion_ingreso: [false, Validators.required],
        entrega_epp: [false, Validators.required],
        certificado_fosyga: [false, Validators.required],

    });



    constructor(private _formBuilder: FormBuilder,
        private membershipService: MembershipService,
        private service_user: UserService) { }

    ngOnInit() {
        this.getMembership();
        this.createFrom();
        this.dataUser = JSON.parse(localStorage.getItem('infoUser'));
    }

    createFrom() {
        this.formValidateCode = this._formBuilder.group({
            codigo: [''],
        });
    }

    getMembership() {
        this.listUserCheck = [];
        this.membershipService.getMembership().subscribe((data: any) => {
            const listMembership = data
            console.log(data);

            for (let index = 0; index < listMembership.length; index++) {
                const state = listMembership[index].estado;
                debugger
                if (state === 'pendiente_validar_doumentos') {
                    this.listUserCheck.push(listMembership[index])
                }
            }
            console.log("ESTADOS", this.listUserCheck);
        })
    }

    afiliar(id: string) {

        const data = {
            estado: 'afiliado'
        }

        this.membershipService.putMemberShipState(id, data).subscribe(data => {
            window.location.reload()
        })
    }

    validateCode() {
        this.service_user.getCodigosAutorizacion().subscribe((data: any) => {
            console.log(data);
            this.codeAutorization = data[0].codigo;
            console.log(this.codeAutorization);
            console.log(this.formValidateCode.value.codigo);
            
            if (this.codeAutorization === this.formValidateCode.value.codigo){
                console.log("IGUALES ES AUTORIZADO");
                this.stateCodeAutorization = true;
                alertify.success('Usuario Autorizado');
            }else{
                console.log("ERROR DE AUTORIZADO");
                alertify.error('Usuario No Autorizado');
            }
        })

      }
}
