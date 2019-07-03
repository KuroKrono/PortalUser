import { NgModule } from "@angular/core";
import { DepartmentListComponent } from "./department-list/department-list.component";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { DepartmentService } from "./department.service";
import { DepartmentCreateComponent } from "./department-create/department-create.component";
import { DepartmentDeleteComponent } from "./department-delete/department-delete.component";
import { DepartmentEditComponent } from "./department-edit/department-edit.component";


const routes: Routes = [
  { path: 'departments', component: DepartmentListComponent },
  //{ path: 'users', component: UserListComponent, /*canActivate: [AuthGuard], data: { title: 'Tasks', roles: ['Admin', 'User', 'SuperUser'] }*/ },
  //{ path: 'add-user', component: UserCreateComponent, /*canActivate: [AuthGuard]*/ },
  //{ path: 'edit-user/:id', component: ProductEditComponent, canActivate: [AuthGuard] },
  //{ path: 'user-detail/:id', component: ProductDetailComponent },
  //{ path: 'delete-user/:id', component: ProductDeleteComponent, canActivate: [AuthGuard] },
];
@NgModule({
  declarations: [
    DepartmentListComponent,
    DepartmentCreateComponent,
    DepartmentEditComponent,
    DepartmentDeleteComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    DepartmentCreateComponent,
    DepartmentEditComponent,
    DepartmentDeleteComponent
  ],
  providers: [
    DepartmentService
  ],
})
export class DepartmentModule { }
