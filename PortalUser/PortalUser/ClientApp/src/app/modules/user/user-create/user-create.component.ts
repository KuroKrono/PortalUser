import { Component, OnInit, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { IUserModel } from '../../../models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IDepartment } from '../../../models/department.model';
import { DepartmentService } from '../../department/department.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  subscription: Subscription;
  userForm: FormGroup;
  isSubscribe: boolean = false;
  departments$: Observable<IDepartment[]>;

  constructor(private userServices: UserService,
    private departmentServices: DepartmentService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogRef: MatDialogRef<UserCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      id: [0, Validators.required],
      UserName: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(3)]],
      DepartmentId: ['', Validators.required]
    });
  }

  ngOnInit() {
    
    this.departments$ = this.departmentServices.getDepartmentsList();
  }
  
  
  addUser() {
    this.subscription = this.userServices.create(this.userForm.getRawValue()).subscribe(() => {
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
