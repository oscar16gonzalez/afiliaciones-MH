import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/users.service';

@Component({
  selector: 'app-list-user-system',
  templateUrl: './list-user-system.component.html',
  styleUrls: ['./list-user-system.component.css']
})
export class ListUserSystemComponent implements OnInit {

  dataUserSystem : any = [];

  constructor(private users_systems_services: UserService) { }

  ngOnInit(): void {
    this.users_systems_services.getUsers().subscribe(data =>{
      this.dataUserSystem = data;
      
    })
  }

}
