import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../../auth.services';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  subscription: Subscription;
  loginForm: FormGroup;
  isSuccess: boolean = false;
  ShowText: boolean = false;
  text: string = "";

  constructor(private authServices: AuthService,
    private route: Router,
    private formBuilder: FormBuilder) {
    this.loginForm = new FormGroup({
      'login': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }


  ngOnInit() {
  }

  login() {
    this.subscription = this.authServices.login(this.loginForm.getRawValue()).subscribe(data => {
      localStorage.setItem('access_token', data['access_token']);
      console.log(localStorage.getItem('access_token'));
      localStorage.setItem('refresh_token', data['refresh_token']);
      localStorage.setItem('user_name', data['user_name']);
      localStorage.setItem('role', data['role']);
      localStorage.setItem('admin', data['admin']);
      localStorage.setItem('id', data['id']);
      console.log(data['admin']);
      console.log(data['user_name']);
      this.isSuccess = true;
      this.ShowText = true;
      this.text = "Successed";
      this.route.navigate(['users']);
      if (this.authServices.IsAdmin) {
        /* if (data['admin'] !== true) {
           this.route.navigate(['home']);
         } else {
           this.route.navigate(['admin']);
         }*/
        this.route.navigate(['admin']);
      }
    }, error => {
      this.text = error.error_description;
      this.isSuccess = true;
      this.ShowText = true;
      console.log(error);
    });
  }

}
