import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContractsService } from 'app/services/contract/contracts.service';
import { UserService } from '../../services/user/users.service';
import { FormControl } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-modal-create-project',
  templateUrl: './modal-create-project.component.html',
  styleUrls: ['./modal-create-project.component.css']
})
export class ModalCreateProjectComponent implements OnInit {

  formCreateContract: FormGroup;
  responseData;
  listUser: any = '';
  arrayUser;
  imageCT: '';
  imgDefault = 'data:image/png;base64,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'


  constructor(private fb: FormBuilder, private contract_service: ContractsService, private user_service: UserService) { }

  ngOnInit(): void {

    this.createFrom();
    this.getUsers();
  }

  createFrom() {
    this.formCreateContract = this.fb.group({
      contrato: [''],
      objeto_contrato: [''],
      contratista: [''],
      nit: [''],
      nombre_rep_legal: [''],
      cedula_rep_legal: [''],
      // integrantes: this.fb.group({
      //   nombre: [''],
      //   numero_documento: [''],
      //   porcentaje: [''],
      // }),
      // anticipo: [''],
      // interventoria: this.fb.group({
      //   nombre: [''],
      //   nit: [''],
      //   representante_legal: [''],
      //   cedula_representante_legal: [''],
      // }),
      valor_contrato: [''],
      departamento: [''],
      municipio: [''],
      usuarios: [],
      url_proceso: [],
      celular_1: [''],
      celular_2: [''],
      correo_1: [''],
      correo_2: [''],
      entidad: [''],
      logo: [''],
      ips: [''],
      direccion_ips: [''],
      telefono_ips: [''],
      arl: [''],
      
    });
  }

  getUsers() {
    this.user_service.getUsers().subscribe(responseUser => {
      console.log("response", responseUser);
      this.listUser = responseUser

    })
  }

  uploadImg($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    console.log(file);
    this.convertToBase64(file)

  }

  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber)
    });
    observable.subscribe((data) => {
      console.log(data);
      this.imageCT = data;

    })
  }



  
  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader()

    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    }
    filereader.onerror = (error) => {
      subscriber.error(error)
    }
  }


  createProject() {
    this.imageCT === undefined ? this.formCreateContract.value.logo = this.imgDefault : this.formCreateContract.value.logo = this.imageCT;

    const idUser = JSON.parse(localStorage.getItem('infoUser'));
    this.contract_service.postProjects(this.formCreateContract.value).subscribe(data => {
      this.responseData = data;
      this.updateUserProject();
    })
  }

  updateUserProject() {

    this.arrayUser = this.formCreateContract.value.usuarios;

    console.log("ARRAY", this.arrayUser);
    console.log("ID PROYECTO", this.responseData.proyects._id);

    const dataContract = {
      proyectos: this.responseData.proyects._id,
      nameProyecto: this.responseData.proyects.contratista,
    }

    console.log("UPDATE", dataContract);

    for (let index = 0; index < this.arrayUser.length; index++) {
      const element = this.arrayUser[index];
      console.log(element);

      this.user_service.putProjectUser(this.arrayUser[index], dataContract).subscribe(data => {
      })

    }
  }
}
