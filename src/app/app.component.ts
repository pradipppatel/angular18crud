import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeModel } from './model/Employee';
import { JsonPipe } from '@angular/common';
import { ParsedEvent } from '@angular/compiler';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title="Angular 18 CRUD";
  employeeForm: FormGroup = new FormGroup({});
  employeeObj: EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel[] = [];

  constructor(){
    this.createForm();
    const oldData = localStorage.getItem("EmpData");

    if (oldData != null){
      const parseData = JSON.parse(oldData);
      this.employeeList = parseData;
    }
  }

  createForm(){
    this.employeeForm = new FormGroup({
      empId: new FormControl(this.employeeObj.empId),
      empName : new FormControl(this.employeeObj.empName,[Validators.required]),
      empCity : new FormControl(this.employeeObj.empCity),
      empState : new FormControl(this.employeeObj.empState),
      empAddress : new FormControl(this.employeeObj.empAddress),
      empEmailId : new FormControl(this.employeeObj.empEmailId),
      empContactNo : new FormControl(this.employeeObj.empContactNo,[Validators.required,Validators.minLength(10)]),
      empPincode : new FormControl(this.employeeObj.empPincode)
    })
  }

  onSave(){
    const oldData = localStorage.getItem("EmpData");

    if (oldData != null){
      const parseData = JSON.parse(oldData);
      this.employeeForm.controls['empId'].setValue(parseData.length + 1);
      this.employeeList.unshift(this.employeeForm.value);
    }
    else{
      this.employeeList.unshift(this.employeeForm.value);
    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    this.onReset();
  }

  onEdit(item: EmployeeModel){
    this.employeeObj = item;
    this.createForm();
  }

  onUpdate(){
    const record = this.employeeList.find(m => m.empId == this.employeeForm.controls['empId'].value);

    if (record != undefined){
      record.empName = this.employeeForm.controls['empName'].value;
      record.empContactNo = this.employeeForm.controls['empContactNo'].value;
      record.empEmailId = this.employeeForm.controls['empEmailId'].value;
      record.empCity = this.employeeForm.controls['empCity'].value;
      record.empState = this.employeeForm.controls['empState'].value;
      record.empPincode = this.employeeForm.controls['empPincode'].value;
      record.empAddress = this.employeeForm.controls['empAddress'].value;
    }

    localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    this.onReset();
  }

  onDelete(id: number){
    const isDelete = confirm("Are you sure want to Delete?");
    if (isDelete){
      const indx = this.employeeList.findIndex(m => m.empId == id);
      this.employeeList.splice(indx,1);
      localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    }
  }
  
  onReset(){
    this.employeeObj = new EmployeeModel();
    this.createForm();
  }
}
