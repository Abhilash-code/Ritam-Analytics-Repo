import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              public authService: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }


  // refreshList() {
  //   this.router.navigateByUrl('/AddStudent', { skipLocationChange: true }).then(() => {
  //     this.router.navigate(['StudentList'], {relativeTo: this.route});
  //   });
  // }

  logout(){
    this.authService.signOut();
  }

}
