export interface Employee {
    id:number;
    name:string;
    shareDetails:string;
    address:string;
    passportDetails:string;
}

export interface EmployeeResponse{
    count:number;
    data:Employee[];
}