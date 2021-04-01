import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentData } from '../Models/student-data.model';

const baseUrl = "http://localhost:8080/api/students_data";
//const baseUrl = "/studentsapi";

@Injectable({
  providedIn: 'root'
})



export class StudentDataService {

  constructor(private http: HttpClient) { }



getAll(params: any): Observable<any>{

 return this.http.get<StudentData[]>(baseUrl, {params});

}

getDataById(id: any): Observable<any>{
 return this.http.get<StudentData>(`${baseUrl}/${id}`);
}

createData(data: any): Observable<any>{
  return this.http.post(baseUrl, data);
}

updateData(id: any, data: any): Observable<any>{
  return this.http.put(`${baseUrl}/${id}`, data);
}

deleteData(id: any): Observable<any>{
  return this.http.delete(`${baseUrl}/${id}`);
}


deleteAll(): Observable<any>{
  return this.http.delete(baseUrl);
}


filterData(roll_number: any): Observable<any[]>{
  return this.http.get<StudentData[]>(`${baseUrl}?roll_number=${roll_number}`);
 }

  // getInsuredData(id) {
  //   let header = new HttpHeaders();
  //   header = header.set("Accept", "application/json");
  //   header = header.append("Content-Type", "text/plain");
  //   return this.http.get(this.Url + this.baseUrl + "getanimalSearchI?limit=1000&from=0");
  // }

}

