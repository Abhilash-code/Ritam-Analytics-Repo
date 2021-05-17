import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';
import { StudentData } from 'src/app/Models/student-data.model';
import{ UploadExcelService } from '../../services/upload-excel.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-uploadexcel',
  templateUrl: './uploadexcel.component.html',
  styleUrls: ['./uploadexcel.component.scss'],
  animations: [
    trigger('visibilityChanged', [
      state('in', style({
        opacity: 0
      })),
      state('out',   style({
        opacity: 1
      })),
      transition('in => out', animate('100ms ease-in')),
      transition('out => in', animate('100ms ease-out'))
    ])
  ]
})
export class UploadexcelComponent implements OnInit, AfterViewInit {



isUploaded: boolean = false;
  selectedExcel?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';


  excelInfos?: Observable<any>;



  students_data: StudentData[] = [];

  @ViewChild('fileInput') fileInput!: ElementRef;
  fileAttr = 'Choose File';


  displayedColumns: string[] = [];

      dataSource = new MatTableDataSource<any>();

      @ViewChild(MatPaginator) paginator!: MatPaginator;

   constructor(private uploadService : UploadExcelService) { }

   selectExcel(event: any): void{
    this.selectedExcel = event.target.files;

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;

  }

  onFileChange(evt: any) {


    this.selectExcel(evt);

    const target : DataTransfer =  <DataTransfer>(evt.target);


    if (target.files.length > 1) throw new Error('Cannot use multiple files');



    if (target.files && target.files[0]) {
      this.fileAttr = '';
      Array.from(target.files).forEach((file: any) => {
        this.fileAttr += file.name;
      });

      const reader: FileReader = new FileReader();

      reader.onload = (e: any) => {
          const bstr: string = e.target.result;
          const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary', cellDates: true });

          const wsname : string = wb.SheetNames[0];


          const ws: XLSX.WorkSheet = wb.Sheets[wsname];

          this.students_data = (XLSX.utils.sheet_to_json(ws));
          //console.log(this.students_data)

          let x = this.students_data.slice(1);
          //console.log(Object.keys(x[0]))
          this.displayedColumns = Object.keys(x[0])
          this.dataSource = new MatTableDataSource<any>(this.students_data);

          this.dataSource.paginator = this.paginator;
          //console.log(this.dataSource.data)
      };

    reader.readAsBinaryString(target.files[0]);
    //this.fileInput.nativeElement.value = "";

    }
    else{
      this.fileAttr = 'Choose File';
    }


  }


  upload():void {
    this.isUploaded = false;
    this.progress = 0;

    if(this.selectedExcel){
      //console.log(this.selectedExcel)
      const excel: File | null = this.selectedExcel.item(0);

      if(excel) {
        this.currentFile = excel;

        this.uploadService.upload(this.currentFile).subscribe(
          (event:any)=>{
            if(event.type === HttpEventType.UploadProgress){
              this.progress = Math.round(100 * event.loaded/event.total)
            } else if (event instanceof HttpResponse){
              setTimeout( () =>{this.currentFile = undefined} , 1000);
              this.message = event.body.message;
              this.isUploaded = true;
              this.excelInfos = this.uploadService.getExcelInfo();
              setTimeout( () =>{this.message = ''} , 3000);
            }
          },
          (error: any) => {
            console.log(error);
            this.progress = 0;
            this.isUploaded = false;

            if (error.error && error.error.message){
              this.message = error.error.message;
            }else {
              this.message = 'Could not upload the excel!';
            }

            this.currentFile = undefined;
          }
        );
      }
      this.selectedExcel = undefined;

    }
  }


}

