import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
  data;
  dataUser;
  
  constructor(public dialogRef: MatDialogRef<TypographyComponent>) { }

  ngOnInit() {
    this.dataUser = JSON.parse(localStorage.getItem('infoUser'));
  }

  onNoClick(data): void {
    console.log(data);
    
    this.dialogRef.close();
  }

}
