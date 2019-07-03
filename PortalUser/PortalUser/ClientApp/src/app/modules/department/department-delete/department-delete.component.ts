import { Component, OnInit, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IUserModel } from '../../../models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IDepartment } from '../../../models/department.model';
import { DepartmentService } from '../../department/department.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-department-delete',
  templateUrl: './department-delete.component.html',
  styleUrls: ['./department-delete.component.css']
})
export class DepartmentDeleteComponent implements OnInit {
  isSubscribe: boolean = false;
  subscription: Subscription;
  constructor(private departmentService: DepartmentService,
    private dialogRef: MatDialogRef<DepartmentDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router) {
  }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  confirm(isDelete: boolean) {
    debugger;
    if (isDelete) {
      console.log(this.data.department.id);
      this.subscription = this.departmentService.delete(this.data.department.id).subscribe(resp => {
        this.isSubscribe = true;
      });
    }
    this.dialogRef.close();
  }

  ngOnDestroy() {
    if (this.isSubscribe) {
      this.subscription.unsubscribe();
    }
  }
  
}
