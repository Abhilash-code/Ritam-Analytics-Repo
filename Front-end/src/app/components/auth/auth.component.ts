import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  hide = true;
  login: FormGroup;
  isLogin:boolean=true;
  constructor(public authService: AuthService, public router: Router) {
    this.login = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  onlogin() {
    this.authService.signIn(this.login.value.email, this.login.value.password);
  if(this.isLogin){}
  else{

  }
  }
  switchAuthMode(){
    this.isLogin=!this.isLogin;
  }
}
