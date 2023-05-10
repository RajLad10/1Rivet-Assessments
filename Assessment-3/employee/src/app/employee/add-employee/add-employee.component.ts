import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Validation } from '../validators/validation';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  form: FormGroup;
  submitted = false;
  dataID : undefined | any;
  toUpdate : undefined | any;

  constructor(
    private formBuilder: FormBuilder, 
    private apiService : ApiService, 
    private route: Router,
    private activatedRoute: ActivatedRoute
    ) {
    this.form = this.formBuilder.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(25),
          ],
        ],

        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(25),
          ],
        ],
        
        email: [
          '',
          [
            Validators.required,
            Validators.email,
          ],
        ],

        department: [
          '',
          [
            Validators.required,
          ],
        ],

        address: [
          '',
          [
            Validators.required,
          ],
        ],

        number: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ],
        ],

        description: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(150),
          ],
        ],

        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(25),
          ],
        ],

        confirmPassword: [
          '',
          [
            Validators.required,
          ],
        ],

        status: [
          '',
          [
            Validators.required,
          ],
        ],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    )
  }

  get f(): { [key : string]: AbstractControl}
  {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if(this.form.invalid)
    {
      return;
    }
    console.log(this.form);

    if (this.dataID) {
      this.apiService.updateEmployee(this.toUpdate.id, this.form.value).subscribe((res:any) => {
        this.route.navigate(["/"]);
      })
    }
    else
    {
      this.apiService.addEmployee(this.form.value).subscribe((res:any) => {
      
        this.route.navigate(["/"]);
      });
    }
    
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  ngOnInit() {
    
      this.activatedRoute.paramMap.subscribe((param: Params) => {
        let id = param['get']('id');
        this.dataID = id;
      });

      if (this.dataID) {
      this.apiService.fetchData(this.dataID).subscribe((data: any) => {
    
        this.toUpdate = data;

        this.form.setValue(
          {
          'firstName':  this.toUpdate.firstName, 
          'lastName' : this.toUpdate.lastName,
          'email' : this.toUpdate.email,
          'department' : this.toUpdate.department,
          'address' : this.toUpdate.address,
          'number' : this.toUpdate.number,
          'description' : this.toUpdate.description,
          'password' : this.toUpdate.password,
          'confirmPassword' : this.toUpdate.confirmPassword,
          'status': this.toUpdate.status,
        });
      });
    }
  
  
}
}
