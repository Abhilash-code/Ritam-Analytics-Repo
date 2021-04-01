import { Injectable } from '@angular/core';

import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadExcelService {

 private baseUrl = 'http://localhost:8080/api/excel';
 //  private baseUrl = '/excelapi';

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    console.log(req);

    return this.http.request(req);
  }

  getExcelInfo(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getInfo`)
  }
}
