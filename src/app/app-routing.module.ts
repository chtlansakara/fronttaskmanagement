import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { redirectGuard } from './guards/redirect.guard';
import { roleGuard } from './guards/role.guard';
import { RestrictedComponent } from './common/restricted/restricted.component';

const routes: Routes = [
  {path:'',  canActivate:[redirectGuard], component: LoginComponent },
  {path:"login", component: LoginComponent},
  {path:"signup", component: SignupComponent},
  {path:"admin", loadChildren: ()=> import("./modules/admin/admin.module").then(e => e.AdminModule ),
    canActivate: [roleGuard],
    data: { role: 'ADMIN' }
  },
  {path:'employee', loadChildren: ()=> import("./modules/employee/employee.module").then(e=>e.EmployeeModule),
    canActivate: [roleGuard],
    data: { role: 'EMPLOYEE'}
  },
  {path:'restricted', component: RestrictedComponent},
  {path:"**", canActivate:[redirectGuard], component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
