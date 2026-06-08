import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

import { EmployeeService } from '../../Service/employee.service';
import { Employee, EmployeeResponse } from '../../Model/employee.model';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './employee.html',
  styleUrls: ['./employee.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class EmployeeComponent implements OnInit {

  employees: Employee[] = [];
  employee: Employee = this.createEmptyEmployee();
  isEditMode = false;
  private pageNumber = 1;
  private pageSize = 10;

  constructor(
    private employeeService: EmployeeService,
    private cdr:ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  addEmployee(form: NgForm): void {

    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.employeeService
      .createEmployee(this.employee)
      .subscribe({
        next: (response) => {
          this.loadEmployees();
          form.resetForm();
          this.employee = this.createEmptyEmployee();
          this.isEditMode = false;
        },
        error: (err) => {
        }
      });
  }

  editEmployee(emp: Employee): void {

    this.employee = {
      id: emp.id,
      name: emp.name,
      shareDetails: emp.shareDetails,
      address: emp.address,
      passportDetails: emp.passportDetails
    };

    this.isEditMode = true;
  }

  updateEmployee(form: NgForm): void {

    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.employeeService
      .updateEmployee(this.employee.id, this.employee)
      .subscribe({
        next: (response) => {
          this.loadEmployees();
          this.cancelEdit(form);
        },
        error: (err) => {
        }
      });
  }

  deleteEmployee(id: number): void {

    const confirmed = confirm('Delete this record?');
    if (!confirmed) {
      return;
    }

    this.employeeService
      .deleteEmployee(id)
      .subscribe({
        next: () => {
          this.loadEmployees();
        },
        error: (err) => {
        }
      });
  }

  cancelEdit(form?: NgForm): void {

    this.employee = this.createEmptyEmployee();
    this.isEditMode = false;

    if (form) {
      form.resetForm();
    }
  }

  nextPage(): void {

    this.pageNumber++;
    this.loadEmployees();
  }

  previousPage(): void {

    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.loadEmployees();
    }
  }

   private loadEmployees(): void {

    this.employeeService
      .getEmployees(this.pageNumber, this.pageSize)
      .subscribe({
        next: (response: EmployeeResponse) => {
          this.employees = response.data;
          this.cdr.detectChanges();
        },
        error: (err) => {
        }
      });
  }

  private createEmptyEmployee(): Employee {
    return {
      id: 0,
      name: '',
      shareDetails: '',
      address: '',
      passportDetails: ''
    };
  }

}