import { Component, OnInit, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { IUserModel } from '../../../models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IDepartment } from '../../../models/department.model';
import { DepartmentService } from '../../department/department.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {
  isSubscribe: boolean = false;
  subscription: Subscription;
  constructor(private userServices: UserService,
    private dialogRef: MatDialogRef<UserDeleteComponent>,
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
      console.log(this.data.user.id);
      this.subscription = this.userServices.delete(this.data.user.id).subscribe(resp => {
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
