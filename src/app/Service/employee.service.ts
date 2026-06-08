import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, EmployeeResponse } from '../Model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'https://localhost:7035/api/Employee';//Please change this based on the port where we are hosting the backend.

  constructor(private http: HttpClient) { }

  getEmployees(pageNumber: number, pageSize: number): Observable<EmployeeResponse> {
    return this.http.get<EmployeeResponse>(
      `${this.apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(
      this.apiUrl,
      employee
    );
  }

  updateEmployee(id: number, employee: Employee): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/${id}`,
      employee
    );
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}