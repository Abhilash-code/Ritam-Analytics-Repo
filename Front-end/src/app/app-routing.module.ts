
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStudentDataComponent } from './components/add-student-data/add-student-data.component';
import { AuthComponent } from './components/auth/auth.component';
import { ExcelListComponent } from './components/excel-list/excel-list.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { UploadexcelComponent } from './components/uploadexcel/uploadexcel.component';
import { AuthguardGuard } from './guard/authguard.guard';


const routes: Routes = [

  {
    path: '', redirectTo: 'auth', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthguardGuard], children: [

      {
        path: '', redirectTo: 'uploadexcel', pathMatch: 'full'
        }
    //     ,{
    // path: 'StudentList', component: StudentsListComponent
    // }
    ,{
      path: 'uploadfile', component: UploadexcelComponent
    },
    {
      path: 'fileList', component: ExcelListComponent
    }
    ]
  },

  // {
  //   path: 'StudentDetails/:id', component: StudentDetailsComponent,canActivate: [AuthguardGuard]
  // },
  // {
  //   path: 'AddStudent', component: AddStudentDataComponent,canActivate: [AuthguardGuard]
  // },
  {
    path: 'auth', component: AuthComponent
  },
  {
    path: 'not-found', component: PageNotFoundComponent
  },
  {
    path: '**', redirectTo: "/not-found", pathMatch: 'full'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
