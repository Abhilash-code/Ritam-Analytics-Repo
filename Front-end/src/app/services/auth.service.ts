import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { User } from "./userdata";
import firebase from 'firebase';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning

  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        // JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user','');
        // JSON.parse(localStorage.getItem('user'));
      }
    })
  }


   //sweetalert2
   Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    // timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })


  // Sign in with email/password
  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['/home/uploadfile'])
        });

        this.alertSuccess();
      }).catch((error) => {
        console.log(error.message)
        if(error.message.indexOf('network error') != -1){
          this.alertNetworkError();
        }
        else{
          this.alertError();
        }
      })
  }





//messages for signin module
alertError(){
  this.Toast.fire({
    icon: 'error',
    title: 'Invalid Email or Password',
    position: 'top',
    // showCloseButton: true
    timer: 2000
  })
}

  alertSuccess(){
    this.Toast.fire({
      icon: 'success',
      title: 'Signed in successfully',
      timer: 1500
    })
}


alertNetworkError(){
  this.Toast.fire({
    icon: 'error',
    title: 'A network error has occured.',
    position: 'top',
    // showCloseButton: true
    timer: 2000
  })
}







  // Sign out
  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/auth']);
    })
  }



}


