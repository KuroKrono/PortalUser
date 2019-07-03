import { Component, OnInit, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IUserModel } from '../../../models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IDepartment } from '../../../models/department.model';
import { DepartmentService } from '../../department/department.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.css']
})
export class DepartmentCreateComponent implements OnInit {
  subscription: Subscription;
  departmentForm: FormGroup;
  isSubscribe: boolean = false;

  constructor(private departmentServices: DepartmentService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogRef: MatDialogRef<DepartmentCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {
    this.departmentForm = this.formBuilder.group({
      id: [0, Validators.required],
      Title: ['', Validators.required]
    });
  }

  ngOnInit() {
  }
  
  addDepartment() {
    this.subscription = this.departmentServices.create(this.departmentForm.getRawValue()).subscribe(() => {
      this.isSubscribe = true;
      this.dialogRef.close();
    }); 
  }

  cancel() {
    this.dialogRef.close();
  }


  ngOnDestroy() {
    if (this.isSubscribe) {
      this.subscription.unsubscribe();
    }
  }
}
