import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from "./user-list/user-list.component";
import { UserService } from "./user.service";
import { MaterialModule } from "../material.module";
import { UserCreateComponent } from "./user-create/user-create.component";
import { DepartmentService } from "../department/department.service";
import { UserDeleteComponent } from "./user-delete/user-delete.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { AuthGuard } from "../../guard/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard]  /*canActivate: [AuthGuard], data: { title: 'Tasks', roles: ['Admin', 'User', 'SuperUser'] }*/ },
  //{ path: 'add-user', component: UserCreateComponent, /*canActivate: [AuthGuard]*/ },
  //{ path: 'edit-user/:id', component: ProductEditComponent, canActivate: [AuthGuard] },
  //{ path: 'user-detail/:id', component: ProductDetailComponent },
  //{ path: 'delete-user/:id', component: ProductDeleteComponent, canActivate: [AuthGuard] },
];
@NgModule({
  declarations: [
    UserListComponent,
    UserCreateComponent,
    UserDeleteComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    UserCreateComponent,
    UserDeleteComponent,
    UserEditComponent,
  ],
  providers: [
    UserService,
    DepartmentService
  ],
})
export class UserModule { }
