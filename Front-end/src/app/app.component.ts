import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "./services/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'front-end';
  isAuth: boolean = false;
  constructor(private router: Router,
    public authService: AuthService,
    public ngZone: NgZone,
    public afAuth: AngularFireAuth) { }

  ngOnInit(): void {

  }

  refreshList() {
    this.router.navigateByUrl('/AddStudent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['StudentList']);
    });
  }
  logout(){
    this.authService.signOut();
  }
}
