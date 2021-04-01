import { Component, OnInit } from '@angular/core';

import{ UploadExcelService } from '../../services/upload-excel.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload-excel',
  templateUrl: './upload-excel.component.html',
  styleUrls: ['./upload-excel.component.scss']
})
export class UploadExcelComponent implements OnInit {

  selectedExcel?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';


  excelInfos?: Observable<any>;

  constructor(private uploadService : UploadExcelService) { }

  selectExcel(event: any): void{
    this.selectedExcel = event.target.files;
  }

  upload():void {
    this.progress = 0;

    if(this.selectedExcel){
      const excel: File | null = this.selectedExcel.item(0);

      if(excel) {
        this.currentFile = excel;

        this.uploadService.upload(this.currentFile).subscribe(
          (event:any)=>{
            if(event.type === HttpEventType.UploadProgress){
              this.progress = Math.round(100 * event.loaded/event.total)
            } else if (event instanceof HttpResponse){
              this.message = event.body.message;
              this.excelInfos = this.uploadService.getExcelInfo();
            }
          },
          (error: any) => {
            console.log(error);
            this.progress = 0;

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

  ngOnInit(): void {
    this.excelInfos = this.uploadService.getExcelInfo();
  }

}
