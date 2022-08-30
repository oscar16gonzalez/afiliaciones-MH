import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/users.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  dataUser;

  constructor() { }

  ngOnInit() {
    this.dataUser = JSON.parse(localStorage.getItem('infoUser'));
  }
}
