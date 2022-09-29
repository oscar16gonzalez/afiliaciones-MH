import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ContractsService } from 'app/services/contract/contracts.service';
import { MembershipService } from 'app/services/membership/membership.service';

@Component({
  selector: 'app-info-projects',
  templateUrl: './info-projects.component.html',
  styleUrls: ['./info-projects.component.css']
})
export class InfoProjectsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  infoProject: any = [];
  dataUserMembership: any = [];
  listAdmin = [];
  listResident = [];
  dataUser;

  constructor(private fb: FormBuilder, private contract_service: ContractsService, @Inject(MAT_DIALOG_DATA) public data: any, public membershipService: MembershipService) { }

  ngOnInit(): void {
    console.log('id que llega', this.data);
    this.contract_service.getProjectsId(this.data.id).subscribe(data => {
      console.log('aca llega data 2', data);
      this.infoProject = data;

      this.dataUser = JSON.parse(localStorage.getItem('infoUser'));
    console.log(this.dataUser);
    

     this.projectsFindId();
 
      
    })
    
  }

  projectsFindId() {
      this.membershipService.getMembership().subscribe(

        (data) => {
          this.dataUserMembership = data;
          for (let index = 0; index < this.dataUserMembership.length; index++) {
            const elementInfo = this.dataUserMembership[index]
            const element = this.dataUserMembership[index].proyectos;
            console.log("ACA VIENE LA DATA DEL USUARIO ( PROYECTO)",element );
            console.log("DATA CENTRO ",this.data );
            
            if (element === this.data.id) {
              this.listAdmin.push(elementInfo)
            }
          }
          this.dataUserMembership = this.listAdmin;
          console.log("LISTA 1", this.dataUserMembership);
        })
      

  }

  getMembership() {
    this.membershipService.getMembership().subscribe((data: any) => { this.listResident = data; this.dataUserMembership = this.listResident; console.log("LISTA ", this.dataUserMembership);
     })
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'ggggg', weight: 1.0079, symbol: ''},
  {position: 1, name: 'ggggg', weight: 1.0079, symbol: ''},
  {position: 1, name: 'ggggg', weight: 1.0079, symbol: ''},
  {position: 1, name: 'ggggg', weight: 1.0079, symbol: ''},
  {position: 1, name: 'ggggg', weight: 1.0079, symbol: ''},
  {position: 1, name: 'ggggg', weight: 1.0079, symbol: ''},
  {position: 1, name: 'ggggg', weight: 1.0079, symbol: ''},
  {position: 1, name: 'ggggg', weight: 1.0079, symbol: ''},
  {position: 1, name: 'ggggg', weight: 1.0079, symbol: ''},
  {position: 1, name: 'ggggg', weight: 1.0079, symbol: ''},
  {position: 1, name: 'ggggg', weight: 1.0079, symbol: ''}
];
