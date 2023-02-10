import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from 'app/modals/create-user/create-user.component';
import { createUnzip } from 'zlib';
import { UserService } from '../../services/user/users.service';

@Component({
  selector: 'app-list-user-system',
  templateUrl: './list-user-system.component.html',
  styleUrls: ['./list-user-system.component.css']
})
export class ListUserSystemComponent implements OnInit {

  dataUserSystem : any = [];

  constructor(private users_systems_services: UserService, public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    this.users_systems_services.getUsers().subscribe(data =>{
      this.dataUserSystem = data;
      
    })
  }

  openCreateUser(){

    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '800px',
      height: '550px'
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result----: ${result}`);
      if (result) {
        this. getUsers();
      }
    });
  }
}
