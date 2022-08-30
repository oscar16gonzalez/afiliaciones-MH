import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as alertify from 'alertify.js';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private router: Router) { }

  redirect(flag: boolean): any {
    if (!flag) {
      this.router.navigate(['/', 'login'])
    }
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const data = JSON.parse(localStorage.getItem('infoUser'));

    if (data.roles === "Super Admin") {
      return true;
    } else {
      alertify.alert('Sin permisos para acceder, debes comunicarte con el admin para otorgargar los debidos permisos.', function () { alertify.error('Sin permisos '); });
      return false
    }
  }

}
