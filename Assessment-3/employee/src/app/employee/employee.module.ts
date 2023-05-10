import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from '../shared/pipes/search.pipe';
import { ShortenPipe } from '../shared/pipes/shorten.pipe';


@NgModule({
  declarations: [
    EmployeeListComponent,
    AddEmployeeComponent,
    ShortenPipe,
    SearchPipe,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class EmployeeModule { }
