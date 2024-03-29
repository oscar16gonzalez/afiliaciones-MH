import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { MembershipService } from '../../services/membership/membership.service';
import { ModalInfoMembershipComponent } from 'app/modals/modal-info-membership/modal-info-membership.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;
    dataMembeship: any;
    notifications = [];
    dataUser;

    constructor(location: Location, private element: ElementRef, private router: Router, public dialog: MatDialog, private memberShip_service: MembershipService) {
        this.location = location;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        this.dataUser = JSON.parse(localStorage.getItem('infoUser'));
        // setInterval(() => {
        this.getMemberShips();
        // }, 5000);

        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.router.events.subscribe((event) => {
            this.sidebarClose();
            var $layer: any = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
                this.mobile_menu_visible = 0;
            }
        });
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function () {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function () {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function () {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function () { //asign a function
                body.classList.remove('nav-open');
                this.mobile_menu_visible = 0;
                $layer.classList.remove('visible');
                setTimeout(function () {
                    $layer.remove();
                    $toggle.classList.remove('toggled');
                }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }

        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }



    getMemberShips() {
        this.memberShip_service.getMembership().subscribe(
            data => {
                this.dataMembeship = data
                for (var i = 0; i < this.dataMembeship.length; i++) {
                    const state = this.dataMembeship[i].estado;
                    const project = this.dataMembeship[i].proyectos;
                    if (state === "pendiente_examen_medico") {
                        if (this.dataUser.roles === "Super Admin") {
                            this.notifications.push({ nombre: this.dataMembeship[i].nombre + ' ' + this.dataMembeship[i].apellido, cedula: this.dataMembeship[i].cedula })
                        } else if (project === this.dataUser.proyectos) {
                            this.notifications.push({ nombre: this.dataMembeship[i].nombre + ' ' + this.dataMembeship[i].apellido, cedula: this.dataMembeship[i].cedula })

                        }
                    }
                }
            }
        )
        setTimeout(() => {
            this.notifications = [];
            this.getMemberShips();
        }, 5000);
    }




    membershipUser(documento) {
        this.openDialog(documento);
    }

    openDialog(cedula) {

        const dialogRef = this.dialog.open(ModalInfoMembershipComponent, {
            width: '1200px',
            data: { cedula }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result-----: ${result}`);
            if (result) {
                console.log("lanzo");
                this.notifications = [];
                // setInterval(() => {
                this.getMemberShips();
                // }, x5000);
            }
        });
    }


}
