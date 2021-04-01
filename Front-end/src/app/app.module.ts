import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialsModule } from '../app/Modules/materials/materials.module';

import { AddStudentDataComponent } from './components/add-student-data/add-student-data.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { StudentDataService } from './services/student-data.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadexcelComponent } from './components/uploadexcel/uploadexcel.component';
import { UploadExcelComponent } from './components/upload-excel/upload-excel.component';
import { UploadExcelService } from './services/upload-excel.service';
import { ExcelListComponent } from './components/excel-list/excel-list.component';
import { FilterPipe } from './pipes/filter.pipe';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthComponent } from './components/auth/auth.component';
// Firebase services + enviorment module
import * as firebase from 'firebase/app';
// import 'firebase/auth';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from '../environments/environment';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AddStudentDataComponent,
    StudentDetailsComponent,
    StudentsListComponent,
    HeaderComponent,
    FooterComponent,
    UploadexcelComponent,
    UploadExcelComponent,
    ExcelListComponent,
    FilterPipe,
    PageNotFoundComponent,
    AuthComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,

  ],
  providers: [StudentDataService,UploadExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
