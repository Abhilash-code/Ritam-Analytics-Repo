import { Component, OnInit } from '@angular/core';
import { StudentData } from '../../Models/student-data.model';
import { StudentDataService } from '../../services/student-data.service'

@Component({
  selector: 'app-add-student-data',
  templateUrl: './add-student-data.component.html',
  styleUrls: ['./add-student-data.component.scss']
})
export class AddStudentDataComponent implements OnInit {

  studentData: StudentData = {
    roll_number: '',
    name: '',
    father_name: '',
    image: '',
    finger_print: '',
    date_stamp: ''
  };

  submitted = false;


  constructor( private studentdataservice: StudentDataService ) { }

  ngOnInit(): void {
  }

  addStudent(): void {
    const data = {
      roll_number: this.studentData.roll_number,
      name: this.studentData.name,
      father_name: this.studentData.father_name,
      image: this.studentData.image,
      finger_print: this.studentData.finger_print,
      date_stamp: this.studentData.date_stamp
    };

    this.studentdataservice.createData(data).subscribe(res=>{
      console.log(res);
      this.submitted = true;
    }, error=>{
      console.log(error);
    });

  }


  newStudentData(): void{
    this.submitted = false;
    this.studentData = {
      roll_number: '',
      name: '',
      father_name: '',
      image: '',
      finger_print: '',
      date_stamp: ''
    }
  }

}
