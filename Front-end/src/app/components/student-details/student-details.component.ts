import { Component, OnInit } from '@angular/core';
import { StudentDataService } from '../../services/student-data.service';
import { StudentData } from '../../Models/student-data.model';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  message: String = '';

  currentStudent: StudentData = {
    roll_number: '',
    name: '',
    father_name: '',
    image: '',
    finger_print: '',
    date_stamp: ''
  };

  constructor(private studentdataservice: StudentDataService,
              private activatedroute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getStudentDetails(this.activatedroute.snapshot.params.id);
  }

  getStudentDetails(id: String): void{
    this.studentdataservice.getDataById(id).subscribe((res)=>{
      console.log(res);
      this.currentStudent = res;
    },(error)=>{
      console.log(error);
    });
  }


  updateStudentDetails(): void{
    this.studentdataservice.updateData(this.currentStudent.id, this.currentStudent).subscribe((res)=>{
      console.log(res);
      this.message = res.message? res.message : 'Student Data was updated successfully!';
    },(error)=>{
      console.log(error);
    });
  }

  deleteStudent(): void{
    this.studentdataservice.deleteData(this.currentStudent.id).subscribe((res)=>{
      console.log(res);
      this.router.navigate(['/StudentList']);
    },(error)=>{
      console.log(error);
    });
  }



}
