import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import  firebase from 'firebase/app';
import 'firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor( public router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return new Promise((resolve, reject) => {   
      firebase.auth().onAuthStateChanged((user: any) => {
        if (user) {
          resolve(true);
        } else {
          this.router.navigate(['/auth'])
          resolve(false);
        }
      })
    })
  }
}
