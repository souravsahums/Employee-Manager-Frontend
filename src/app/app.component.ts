import { EmployeeService } from './employee.service';
import { Employee } from './employee';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public employees!: Employee[]; 
  public rowData: any;
  public columnDefs = [
    {'headerName':'Employee ID', 'field':'employeeId'},
    {'headerName':'Name', 'field':'name'},
    {'headerName':'Job Title', 'field':'jobTitle'},
    {'headerName':'Email ID', 'field':'emailId'},
    {'headerName':'Contact Number', 'field':'contactNo'}
  ]
  title: any;

  constructor (private employeeService: EmployeeService){}

  ngOnInit(): void {
      this.getEmployees();
  }

  public getEmployees() : void{
    document.getElementById('add-employee-form').click();
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        this.rowData = this.employees;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      )
  }

  public onAddEmployee(addForm: NgForm): void {
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
}
