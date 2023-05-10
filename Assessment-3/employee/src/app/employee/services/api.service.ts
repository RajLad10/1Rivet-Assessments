import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'http://localhost:3000/employee'

  constructor(private http: HttpClient) { }

  getEmployees() {
    return this.http.get(this.url); 
  }

  addEmployee(employee : any)
  {
    employee.id = Math.floor(Math.random() * 90 + 10);
    
    return this.http.post(this.url,employee);
  }

  removeEmployee(id : number)
  {
    return this.http.delete(this.url + '/' + id);
  }

  fetchData(id : number)
  {
    return this.http.get(this.url + '/' + id)
  }

  updateEmployee(id : number, data:any){
    return this.http.put(this.url + '/' + id, data);
  }
}
