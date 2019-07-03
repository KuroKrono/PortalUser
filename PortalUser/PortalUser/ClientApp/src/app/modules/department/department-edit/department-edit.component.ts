import { Component, OnInit, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IDepartment } from '../../../models/department.model';
import { DepartmentService } from '../../department/department.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.css']
})
export class DepartmentEditComponent implements OnInit {
  subscription: Subscription;
  departmentForm: FormGroup;
  isSubscribe: boolean = false;

  constructor(private departmentServices: DepartmentService,
    private dialogRef: MatDialogRef<DepartmentEditComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.departmentForm = this.formBuilder.group({
      'Id': new FormControl(data.department.id, Validators.required),
      'Title': new FormControl(data.department.title, Validators.required),
    });
  }

  ngOnInit() { 
  }
  
  editDepartment() {
    this.subscription = this.departmentServices.update(this.departmentForm.getRawValue()).subscribe(() => {
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
