import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  textSearch : string = '';
  isActive : boolean = true;
  headers = [
    {
      firstName : "First Name",
      lastName : "Last Name",
      email : "Email",
      department: "Department",
      address: "Address",
      number: "Contact Number",
      description: "Description",
      status: "Active",
    }
  ]
    
  employees:{ id:number, firstName:string,lastName:string, email: string, department: string, address: string, number: number, description: string, password: string, confirmPassword: string, status: string}[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.apiService.getEmployees().subscribe((res: any) => {
      this.employees = res;
    })
  }

  removeEmployee(id:number){
    this.apiService.removeEmployee(id).subscribe((res:any) => {
      this.getEmployees();
    });
  }
}
