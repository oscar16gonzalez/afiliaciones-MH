import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContractsService } from 'app/services/contract/contracts.service';
import { UserService } from '../../services/user/users.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-modal-create-project',
  templateUrl: './modal-create-project.component.html',
  styleUrls: ['./modal-create-project.component.css']
})
export class ModalCreateProjectComponent implements OnInit {

  formCreateContract: FormGroup;
  responseData;
  listUser: any = '';
  arrayUser ;

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
      celular_1:[''],
      celular_2:[''],
      correo_1: [''],
      correo_2: [''],
      entidad: [''],

    });
  }

  getUsers() {
    this.user_service.getUsers().subscribe(responseUser => {
      console.log("response", responseUser);
      this.listUser = responseUser

    })
  }


  createProject() {
    console.log(this.formCreateContract.value);

    
     
    const idUser = JSON.parse(localStorage.getItem('infoUser'));
    this.contract_service.postProjects(this.formCreateContract.value).subscribe(data => {
      this.responseData = data;
      console.log("RESPONSE POST PRJECT", this.responseData);
      
      this.updateUserProject();
    })
  }

  updateUserProject(){

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
