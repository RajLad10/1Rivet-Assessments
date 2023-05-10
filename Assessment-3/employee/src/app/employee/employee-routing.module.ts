import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [
  { path: "emp-list", component: EmployeeListComponent},
  { path: "add-emp", component: AddEmployeeComponent},
  { path: "edit-emp/:id", component: AddEmployeeComponent},

  // {path: "edit-emp/:id", component: EmployeeListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
