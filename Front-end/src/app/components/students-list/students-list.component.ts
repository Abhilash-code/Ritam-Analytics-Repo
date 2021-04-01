import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentData } from '../../Models/student-data.model';
import { StudentDataService } from '../../services/student-data.service';
import { HttpParams } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit, AfterViewInit {


  fileName= 'ExcelSheet.xlsx';

students_data: StudentData[] = [];
currentStudent?: StudentData;
currentIndex = -1;
roll_number: any = '';
loading: boolean = true;


local_students_data = this.students_data;

pageIndex = 0;


  length = 0;
  pageSize: any = 5;
  pageSizeOptions: number[] = [5, 10, 50, 100];


// MatPaginator Output
pageEvent: PageEvent | undefined;




displayedColumns: string[] = [
       'serial_number',
      'roll_number',
      'name',
      'father_name',
      'image',
      'finger_print',
      'date_stamp'];

      dataSource = new MatTableDataSource<any>();

      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
  constructor(private studentdataservice: StudentDataService) {}

  ngOnInit(): void {
    this.student_list('0', '10');


    }



  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  check_pagination(search_rollNumber: number, pageIndex: number, pageSize: number): any{
    let params: any = {};

    if(search_rollNumber){
      params[`roll_number`] = search_rollNumber;
    }

    if(pageIndex){
      params[`pageIndex`] = pageIndex;
    };

    if(pageSize){
      params[`pageSize`] = pageSize;
    }

    return params;
  }


  student_list(page: any,size: any){

    let params = new HttpParams();
    params = params.set('page', page);
    params = params.set('size', size);

    this.studentdataservice.getAll(params)
    .subscribe((response:any) =>{
      this.loading = false;
      this.students_data = response.students_data;
      this.students_data.length = response.totalItems;
      this.dataSource = new MatTableDataSource<any>(this.students_data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.students_data)
    },(errors: any)=>{
      console.log(errors);
    })
  }


  getNextData(currentSize: any, page: any, size: any){
    let params = new HttpParams();
    params = params.set('page', page);
    params = params.set('size', size);

    this.studentdataservice.getAll(params)
    .subscribe((response:any)=>{
      this.loading = false
      this.students_data.length = currentSize;
      console.log(this.students_data.length)
      this.students_data.push(...response.students_data);
      this.students_data.length = response.totalItems;
      this.dataSource = new MatTableDataSource<any>(this.students_data);
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },(errors:any)=>{
      console.log(errors);
    })

  }

  pageChanged(event:any){
    this.loading = true;
    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;

    this.pageIndex = pageIndex;
    this.pageSize = pageSize;

    let previousIndex = event.previousPageIndex;

    let previousSize = pageSize * pageIndex;

    this.getNextData(previousSize, (pageIndex).toString(), pageSize.toString());
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  setActiveStudentsData(activeStudents: StudentData, index: number): void{
      this.currentStudent = activeStudents;
      this.currentIndex = index;
  }

  // deleteAllData(): void{
  //   this.studentdataservice.deleteAll().subscribe((res)=>{
  //     console.log(res);
  //     this.refreshList();
  //   },(error)=>{
  //     console.log(error);
  //   });
  // }

  filterDataByRollNumber(searchinput: any): void{///////// filters list of students data
    this.currentStudent = undefined;
    this.currentIndex = -1;
    this.roll_number = searchinput.value;
    console.log(this.roll_number)
    this.studentdataservice.filterData(this.roll_number).subscribe((res: any)=>{

      this.students_data = res.students_data;

      this.local_students_data = this.students_data;
      this.dataSource.data = this.students_data;
      console.log(res.students_data[0]);
    }, (error)=>{
      console.log(error);
    });
  }

  checkSearchBAr(searchinput: any)/////checks search bar for null value to reload list
  {
    if(searchinput.value != '')
    {

    }
    else{
      this.roll_number = '';
      this.student_list('0', this.pageSize);
      this.dataSource.data = this.local_students_data;
    }
  }




  exportexcel(): void/////////////////////////Code to download excel/////
    {
       /* table id is passed over here */
       let element = document.getElementById('excel-table');
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);

    }


}
