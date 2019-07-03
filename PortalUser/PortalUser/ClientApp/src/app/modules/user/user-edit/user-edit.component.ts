import { Component, OnInit, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { IUserModel } from '../../../models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IDepartment } from '../../../models/department.model';
import { DepartmentService } from '../../department/department.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  subscription: Subscription;
  userForm: FormGroup;
  isSubscribe: boolean = false;
  departments$: Observable<IDepartment[]>;

  constructor(private userServices: UserService,
    private departmentServices: DepartmentService,
    private dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      'Id': new FormControl(data.user.id, Validators.required),
      'UserName': new FormControl(data.user.userName, Validators.required),
      'DepartmentId': new FormControl(data.user.departmentId),
    });
  }

  ngOnInit() {
    this.departments$ = this.departmentServices.getDepartmentsList();
  }
  
  editUser() {
    this.subscription = this.userServices.update(this.userForm.getRawValue()).subscribe(() => {
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
