import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MapsComponent } from 'app/maps/maps.component';
import { ModalCreateProjectComponent } from 'app/modals/modal-create-project/modal-create-project.component';
import { ContractsService } from 'app/services/contract/contracts.service';
import { InfoProjectsComponent } from 'app/page/info-projects/info-projects/info-projects.component';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dataContratc: any = '';
  dataUser;
  dataAdmin: boolean;
  dataUserInfo: boolean = false;

  constructor(public dialog: MatDialog, private contract_service: ContractsService) { }

  ngOnInit() {  
    this.dataUser = JSON.parse(localStorage.getItem('infoUser'));
    if (this.dataUser.roles === "Super Admin") {
      this.Projects();
    } else {
      this.projectsFindId();
      
    }
  }

  Projects() {
    this.contract_service.getProjects().subscribe(data => {
      this.dataContratc = data;
      this.dataAdmin = true;
      console.log("ACA ADMIN", data);
    })
  }

  projectsFindId() {
    if (this.dataUser.proyectos !== '') {
      this.contract_service.getProjectsId(this.dataUser.proyectos).subscribe(data => {
        this.dataContratc = data;
        this.dataUserInfo = true;
      })
    } else {
      this.dataUserInfo = false;
    }

  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalCreateProjectComponent); 
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.Projects();
      }
    });
  }

  openInfoProject(id) {
    console.log('open dilig');
    const dialogRef = this.dialog.open(InfoProjectsComponent, {
      width: '1200px',
      data: { id }
    });
  }

  urlProceso(url){
    window.open(url)
  }
}