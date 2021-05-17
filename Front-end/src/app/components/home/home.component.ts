import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.signOut();
      }
    })

  }

}
