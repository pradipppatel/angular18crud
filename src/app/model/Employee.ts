export class EmployeeModel{
    empId : number;
    empName : string;
    empCity : string;
    empState : string;
    empAddress : string;
    empEmailId : string;
    empContactNo : string;
    empPincode : string;

    constructor(){
        this.empId = 1;
        this.empName = '';
        this.empCity = '';
        this.empState = '';
        this.empAddress = '';
        this.empEmailId = '';
        this.empContactNo = '';
        this.empPincode = '';
    }
}