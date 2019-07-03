import { AuthService } from "../../auth.services";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../material.module";

const routes: Routes = [
    { path: 'login', component: LoginComponent, /*canActivate: [AuthGuard], data: { title: 'Tasks', roles: ['Admin', 'User', 'SuperUser'] }*/ },
];
@NgModule({
    declarations:[
        LoginComponent,
    ],
    imports:[
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    providers:[
        AuthService,
    ],
})
export class LoginModule { }
