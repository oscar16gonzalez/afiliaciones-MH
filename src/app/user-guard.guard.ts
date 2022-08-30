import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import * as alertify from 'alertify.js';

@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const data = JSON.parse(localStorage.getItem('infoUser'));

    if (data.roles === "Residente" || data.roles === "Super Admin") {
      return true;
    } else {
      alertify.alert('Sin permisos para acceder a esta seccion, debes comunicarte con el admin del sistema para otorgargar los debidos permisos.', function () { alertify.error('Sin permisos '); });
      return false
    }

  }
}
