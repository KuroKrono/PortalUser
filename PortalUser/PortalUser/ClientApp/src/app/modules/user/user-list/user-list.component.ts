import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { IUserModel } from '../../../models/user.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { UserDeleteComponent } from '../user-delete/user-delete.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserCreateComponent } from '../user-create/user-create.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  isSubscribe: boolean = false;
  subscription: Subscription;
  users$: Observable<IUserModel[]>;
  displayedColumns: string[] = ['#','UserName','Department', 'actions'];

  constructor(private userServices: UserService,
    private dialog: MatDialog,
    private route: Router) {
    }

  ngOnInit() {
    this.users$ = this.load();
  }

  load(): Observable<IUserModel[]> {
    return this.userServices.getUserList();
  }

  addUser() {
    //this.route.navigate(['add-user']);
    const dialogRef = this.dialog.open(UserCreateComponent, {
      
    });
    this.subscription = dialogRef.afterClosed().subscribe(s => {
      debugger;
      this.users$ = this.load();
      this.isSubscribe = true;
    });
  }

  deleteUser(user: IUserModel) {
    const dialogRef = this.dialog.open(UserDeleteComponent, {
      data: { user: user }
    });
    this.subscription = dialogRef.afterClosed().subscribe(s => {
      debugger;
      this.users$ = this.load();
      this.isSubscribe = true;
    });
  }

  editUser(user: IUserModel) {
    const dialogRef = this.dialog.open(UserEditComponent, {
      data: { user: user }
    });
    this.subscription = dialogRef.afterClosed().subscribe(s => {
      debugger;
      this.users$ = this.load();
      this.isSubscribe = true;
    });
  }

  ngOnDestroy() {
    if (this.isSubscribe) {
      this.subscription.unsubscribe();
    }
  }

}
