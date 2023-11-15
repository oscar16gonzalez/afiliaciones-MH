import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/users.service';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;

}



export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Centro de Trabajo', icon: 'dashboard', class: '' },
  // { path: '/create-membership', title: 'Crear Afiliacion Aspirante',  icon:'reorder', class: '' },
  { path: '/table-list', title: 'Lista de Afiliados', icon: 'content_paste', class: '' },
  { path: '/user-profile', title: 'Perfil de Usuario', icon: 'person', class: '' },
  { path: '/user-attendance', title: 'Nomina', icon: 'verified_user', class: '' },
  { path: '/', title: 'Salir del Sistema', icon: 'arrow_back_ios', class: 'active-pro' },
  { path: '/notifications', title: 'Notificaciones', icon: 'notifications', class: '' },
  // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
  // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
  // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
  { path: '/checklist', title: 'Checklist', icon: 'unarchive', class: '' },
  { path: '/assistance', title: 'Asistencia', icon: 'assignment ', class: '' },
];

// export const ROUTES_AUX_ADMIN: RouteInfo[] = [
//   { path: '/dashboard', title: 'Centro de Trabajo',  icon: 'dashboard', class: '' },
//   // { path: '/create-membership', title: 'Crear Afiliacion Aspirante',  icon:'reorder', class: '' },
//   { path: '/table-list', title: 'Lista de Afiliados',  icon:'content_paste', class: '' },
//   { path: '/user-profile', title: 'Perfil de Usuario',  icon:'person', class: '' },
//   { path: '/user-attendance', title: 'Asistencia De Usuarios',  icon:'verified_user', class: '' },
//   { path: '/', title: 'Salir del Sistema',  icon:'arrow_back_ios', class: 'active-pro' },
//   { path: '/notifications', title: 'Notificaciones',  icon:'notifications', class: '' },
//   // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
//   // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
//   // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
//   { path: '/checklist', title: 'Checklist',  icon:'unarchive', class: '' },
// ];

export const ROUTES_ADIMN: RouteInfo[] = [
  { path: '/dashboard', title: 'Centro de Trabajo', icon: 'dashboard', class: '' },
  // { path: '/create-membership', title: 'Crear Afiliacion Aspirante',  icon:'reorder', class: '' },
  { path: '/table-list', title: 'Lista de Afiliados', icon: 'content_paste', class: '' },
  { path: '/list-user-system', title: 'Usuarios Del Sistema', icon: 'supervisor_account', class: '' },
  { path: '/user-profile', title: 'Perfil de Usuario', icon: 'person', class: '' },
  { path: '/user-attendance', title: 'Asistencia De Usuarios', icon: 'verified_user', class: '' },
  //{ path: '/payroll-settings', title: 'Configurar Nomina',  icon:'monetization_on', class: '' },
  { path: '/notifications', title: `Notificaciones`, icon: 'notifications', class: '' },
  { path: '/', title: 'Salir del Sistema', icon: 'arrow_back_ios', class: 'active-pro' },
  // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: '' },
  // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
  { path: '/checklist', title: 'Checklist', icon: 'unarchive', class: '' },
  { path: '/assistance', title: 'assistance', icon: 'assignment', class: '' },

];

export const ROUTES_SISO: RouteInfo[] = [
  { path: '/dashboard', title: 'Centro de Trabajo', icon: 'dashboard', class: '' },
  { path: '/user-profile', title: 'Perfil de Usuario', icon: 'person', class: '' },
  { path: '/notifications', title: `Notificaciones`, icon: 'notifications', class: '' },
  { path: '/', title: 'Salir del Sistema', icon: 'arrow_back_ios', class: 'active-pro' },
  { path: '/checklist', title: 'Checklist', icon: 'unarchive', class: '' },
  { path: '/assistance', title: 'assistance', icon: 'assignment', class: '' },

];


console.log("PRUEBAS RUYTAS", ROUTES);



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  routLogout: any[];
  dataUser;
  notification: any;
  totalNotification = 0;

  listMessageReceived: any = [];

  constructor(private service_user: UserService) { }

  ngOnInit() {
    this.dataUser = JSON.parse(localStorage.getItem('infoUser'));

    this.notifications();


    this.routLogout = [{ path: '/', title: 'Salir del Sistema', icon: 'arrow_back_ios', class: 'active-pro' },]
    if (this.dataUser.roles === "Super Admin") {
      this.menuItems = ROUTES_ADIMN.filter(menuItem => menuItem);

    } else if (this.dataUser.roles === "SISO") {
      this.menuItems = ROUTES_SISO.filter(menuItem => menuItem);
    } else {

      this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
  }

  notifications() {
    this.service_user.getNotification().subscribe((data: any) => {
      this.notification = data;
      for (let index = 0; index < this.notification.length; index++) {
        const element = this.notification[index];
        if (element.id_recibe === this.dataUser._id) {
          this.listMessageReceived.push(element)
          this.totalNotification = this.listMessageReceived.length
        }
      }
    })
    
    setTimeout(() => {
      this.totalNotification = 0;
      this.listMessageReceived = [];
      this.notifications();
    }, 3000);
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  logout() {
    console.log("SALIR");

  }
}
