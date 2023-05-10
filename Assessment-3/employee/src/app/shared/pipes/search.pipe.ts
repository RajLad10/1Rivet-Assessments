import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(employees: any[], textSearch: string): any[] {
    
    if(!employees) return [];
    if(!textSearch) return employees;

    textSearch = textSearch.toLowerCase();

    return employees.filter(employee => {
      return employee.firstName.toLowerCase().includes(textSearch) ||
      employee.lastName.toLowerCase().includes(textSearch) || 
      employee.email.toLowerCase().includes(textSearch) ||
      employee.id.toString().includes(textSearch) ||
      employee.department.toLowerCase().includes(textSearch) ||
      employee.address.toLowerCase().includes(textSearch) || 
      employee.number.toString().includes(textSearch) ||
      employee.status.toLowerCase().includes(textSearch);
    })
  }

}
