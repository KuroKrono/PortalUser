import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DepartmentService } from '../department.service';
import { IDepartment } from '../../../models/department.model';
import { DepartmentCreateComponent } from '../department-create/department-create.component';
import { DepartmentEditComponent } from '../department-edit/department-edit.component';
import { DepartmentDeleteComponent } from '../department-delete/department-delete.component';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  isSubscribe: boolean = false;
  subscription: Subscription;
  departments$ : Observable<IDepartment[]>;
  displayedColumns: string[] = ['#', 'Title', 'actions'];

  constructor(private departmentService: DepartmentService,
    private dialog: MatDialog,
    private route: Router) {
    }

  ngOnInit() {
    this.departments$  = this.load();
  }

  load(): Observable<IDepartment[]> {
    return this.departmentService.getDepartmentsList();
  }
  
  addDepartment() {
    //this.route.navigate(['add-user']);
    const dialogRef = this.dialog.open(DepartmentCreateComponent, {
      
    });
    this.subscription = dialogRef.afterClosed().subscribe(s => {
      debugger;
      this.departments$ = this.load();
      this.isSubscribe = true;
    });
  }

  editDepartment(department: IDepartment) {
    const dialogRef = this.dialog.open(DepartmentEditComponent, {
      data: { department: department }
    });
    this.subscription = dialogRef.afterClosed().subscribe(s => {
      debugger;
      this.departments$ = this.load();
      this.isSubscribe = true;
    });
  }
  
  deleteDepartment(department: IDepartment) {
    const dialogRef = this.dialog.open(DepartmentDeleteComponent, {
      data: { department: department }
    });
    this.subscription = dialogRef.afterClosed().subscribe(s => {
      debugger;
      this.departments$ = this.load();
      this.isSubscribe = true;
    });
  }

 

  ngOnDestroy() {
    if (this.isSubscribe) {
      this.subscription.unsubscribe();
    }
  }

}
