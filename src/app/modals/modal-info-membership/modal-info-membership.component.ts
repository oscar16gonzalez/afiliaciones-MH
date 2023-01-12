import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MembershipService } from 'app/services/membership/membership.service';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import * as alertify from 'alertify.js';
import { MatBottomSheet } from '@angular/material/bottom-sheet';


@Component({
  selector: 'app-modal-info-membership',
  templateUrl: './modal-info-membership.component.html',
  styleUrls: ['./modal-info-membership.component.css']
})
export class ModalInfoMembershipComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  nameUser: any;
  responseDataUserInfo: any = '';
  imageData;

  img="data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAIVArsDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+/igAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAPAf2jP2pv2fP2SfAUnxL/aL+Kvhb4V+EPPe0srzxBczSajruoRwm4bSvDHh3TIL/xF4o1YQK050zw9pWpXyQK9w8CwI8i/RcM8JcR8Y5gsr4ZyjF5vjeVTqQw0Yqlh6bfKq2LxNWVPDYSjze6quJrUqblaKk5NI97h7hjP+K8cst4eyvFZpi7Kc4YeKVOhTb5VVxOIqShh8NS5vd9riKtODlaKk5NI/ms/aI/4OUtL8aS634P/AGKPBlrZiNZ7WL4ofFe2c66658ttS8NfDMBLK3SPabiw1HxFq+txzRzRLqnhWxmiltn/AF+t4DcQ8NQo4vjHDVqNGo42p4GpRxGEUntSr5hh6lWMKjfuuko0ZtxbpVZxamf66/RK/ZzeEviHVw2aeKvi7h+Is1w3LisX4W8FU8xyOpGlBc7p5lxHnuDwGaZnh3GUIY6PDGVYWnhZxlGhxFVc1On+Kmuftu/tfeI/H8fxQ1b9pT4zS+OILiKe11i08feINLhsVhl85LLTtG0q9stC03SDIXaTRLDTLfR5vNuFmsZFuJxJ7NPIclpYf6pDK8CsO004Sw9ObldW5pTnGVSU+1SU3NWVpaK3+0GV/Ri+jvk3CU+BsB4K+G0OF6tGdKvl2I4TyjH1MU6kPZyxWMzLH4bE5rjcxUOVQzTF46tmNP2dJ08VCVGk4fut+xP/AMF/dQsDpHgD9tfRpNVtCRbL8d/BulxJqNsoUCKXxv8AD7RNPig1CPOTcaz4Mit7uNFjRPCOoSyS3afAZ74dxlz4jIp8j3/s+vN8r7qhiakm4vtCu2nq/bRSUT/K/wCk1+yUwmKWY8W/RmzKGAxFnWl4VcSY6pLB15N3nT4Y4uzPGTq4Sdrexy3iWpWw85SnKXEODpwp4eX9Nnw4+Jvw9+L/AIR0vx78LvGfhzx74N1mPfp3iLwvqlrq2mzsqqZbZ5rWRza31qXWO90+7WC+sZswXlvBMrRj8sxWFxOCrTw+LoVcPXg/epVYOEl2dnvF7xkrxktYtrU/xF4z4I4v8O+Icdwnx1w3nPCfEmWz5cZk+eYGvl+NpJuSp1o068Iqvha6i54bGYeVXC4qnarh61Wm1N91XOfLBQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQB/nmf8HMnxh8Y+Ov+Ci1x8L9W1K7bwb8DvhX4E0bwdoX2mZtMtb7x3o1r488Va/FZM5gh1jW5tV0jSdTvY0Wa803wr4ft52dNOtwn+kf0WclwWX+Gcc2o0oLHZ9m+YV8biOWPtZ08vrzy/CYd1Lc0qNCNGtWpQb5YVcXiZRSdWV/7++jdlGEwPh7HM6VOH1zO80x1bF1+Ve1nDA1pYHC0HO3M6NFUq1WnBtqFTFV5Rs6kr/z0W9xcWk8N1azzW1zbypNb3FvK8M8E0bB45YZo2WSKWNwGSRGVkYBlIIBr+j6tGlXpVKFelTrUasJU6tGrCNSlVpzTjOnUpzThOEotqUZJxkm000f0RhcVicDiaGMwWIr4TF4WrCvhsVha1TD4nD16UlOnWoV6UoVaVWnJKUKlOUZwkk4tNXPe/Bvx01HTxBp/iuBtVtFYr/a1uAuqxIQoQXERZLa+jjKj5gLe7w8kks144jjr8V4r8HMBjva43hmrHLcU1zPLazlLLq0r3l7GpadbBzkm2o/vsO5KFOFPDQcpr+4PCT6aHEGRSwuTeJ+HrcTZQrUY8R4KFGnxDgoWkoTxmH/c4XOqcX7OE5ueDx6p8+InWzHEJUav01o+uaRr9qLzR9QtdQt87Xa3lV2ifn93MgO+GTgkLIqllw65RlY/z1m2TZpkeKeDzXBV8FXV3GNaDUasV/y8o1VenXp6256U5xTvFtSTS/0Y4Q434U49ymlnnCOeYHO8uqKPPPCVf3+FqSTaw+PwdRQxeX4pJNvDY2hQrctpqDhKMn9Rfs2/tZfH39kvxe3jL4F/ELV/CNzePbf29oXmG/8ACHiyCz84W1t4q8LXbPpGtJbLc3S2VzcW41HTPtVzJpV7YzTySN8zmmT5dnFH2GYYaFZRv7Op8Nai5Wu6NWNpwvZc"

  constructor(private _bottomSheet: MatBottomSheet, @Inject(MAT_DIALOG_DATA) public data: any, private membershipService: MembershipService, private router: Router, @Inject(DOCUMENT) private document: Document) { }
  

  ngOnInit(): void {
    console.log(this.data);

    this.membershipService.getUserFind(this.data.cedula).subscribe(response => {
      console.log('INFO USER ', response);
      this.nameUser = response[0].nombre
      this.responseDataUserInfo = response[0];

      console.log(this.responseDataUserInfo);

    })

  }

  fileSelected(event: Event) {
  
    const file = (event.target as HTMLInputElement).files[0];
    const fileTypes = ["image/png", "image/jpeg", "image/jpg"]
    if (file && fileTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      }
      reader.readAsDataURL(file);
    }
  }

  modilePhone(){
    alertify.alert("This is an alert dialog.");
  }

  changeState() {
    const data = {
      estado: 'afiliado'
    }
    this.membershipService.putMemberShipState(this.responseDataUserInfo._id, data).subscribe(data => {
      console.log("data-----", data);

    })
  }

  changeStateExamenMedico() {
    const data = {
      estado: 'afiliado_pendiente_examen_medico'
    }
    this.membershipService.putMemberShipState(this.responseDataUserInfo._id, data).subscribe(data => {
      console.log("data-----", data);


    })
  }

  sendWhatsapp() {
    this.document.location.href = `https://api.whatsapp.com/send?phone=+57${this.responseDataUserInfo.celular}&text=Hola%2C%20${this.nameUser}%20${this.responseDataUserInfo.apellido}%20ya%20te%20encuentras%20listo%20para%20comenzar%20a%20trabajar%20con%20la%20empresa%20----%20preséntate%20el%20dia%20(fecha%20de%20inicio)%2014/07/2022.`
  }

  sendEmail() {
    this.document.location.href = `mailto:${this.responseDataUserInfo.correo}.com?subject=Notificación%20de%20Ingreso%3A%20&body=Hola%2C%20${this.nameUser}%20${this.responseDataUserInfo.apellido}%20ya%20te%20encuentras%20listo%20para%20comenzar%20a%20trabajar%20con%20la%20empresa%20----%20preséntate%20el%20dia%20(fecha%20de%20inicio)%2014/07/2022.`
  }


  sendSms() {
    console.log('send');
    this.membershipService.getSMS(this.responseDataUserInfo.nombre, this.responseDataUserInfo.celular).subscribe(data => {
      console.log("data-----", data);
      if (data['message'] === 'OK') {
        alert('Mensaje enviado ')
      }
    })
  }


  showPdf() {
    const linkSource =
      'data:image/jpeg;base64,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';
    const downloadLink = document.createElement('a');
    const fileName = 'sample.jpg';

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }


  

}
