import { Component, OnInit } from '@angular/core';
import { values } from 'lodash';
import { Observable } from 'rxjs';
import { UploadExcelService } from 'src/app/services/upload-excel.service';

@Component({
  selector: 'app-excel-list',
  templateUrl: './excel-list.component.html',
  styleUrls: ['./excel-list.component.scss']
})
export class ExcelListComponent implements OnInit {

  constructor(private uploadService : UploadExcelService) { }

  excelInfos: any;

  searchText!: string;
  excelList: any = [];

  ngOnInit(): void {
    this.uploadService.getExcelInfo().subscribe(
      (res)=>{
        this.excelInfos = res;
        this.excelInfos = this.excelInfos.reverse();
        this.excelInfos.forEach((excel: any)=>{
          this.excelList.push(excel);
      })
      }
    );

      //console.log(this.excelList)

  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.excelList.filter = filterValue.trim().toLowerCase();
  }

}
