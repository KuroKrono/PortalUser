import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import * as jwt_decode from 'jwt-decode';
import { tap } from "rxjs/operators";
import { ITokenModel } from "./models/token.model";
import { ILoginModel } from "./models/login.model";
import { Location } from "@angular/common";


@Injectable()
export class AuthService {
  private readonly authUrl = 'https://localhost:44322/api/auth/';

  constructor(private http: HttpClient,
    private router: Router, private location: Location) {
  }

  login(model: ILoginModel) {
    return this.Request(model);
  }

  private Token(data: ILoginModel) {
    return this.http.post<ITokenModel>(`${this.authUrl}token/`, data);
  }

  private Request(user: ILoginModel) {
    return this.Token(user).pipe(tap(resp => {
      debugger;
      try {
        let parse = jwt_decode<ITokenModel>(resp);
        localStorage.setItem('access_token', resp.access_token);
        localStorage.setItem('user_name', resp.user_name);
        localStorage.setItem('admin', resp.admin);
        localStorage.setItem('role', resp.role);
        localStorage.setItem('refreshToken', resp.refreshToken);
      } catch (error) {
        console.log(error);
      }
    }))

  }

  get accessToken(): string {
    return localStorage.getItem('access_token');
  }

  get isAuthenticated() {
    return localStorage.getItem('access_token') != null;
  }

  get IsAdmin() {
    return localStorage.getItem('admin') === "true";
  }

  checkAcess() {
    return this.http.get<boolean>(`${this.authUrl}checktoken`);
  }
  
  logout() {
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }

  refresh() {
    return this.RefreshToken(localStorage.getItem('refreshToken'));
  }

  private RefreshToken(refreshToken: string) {
    var refreshTokenModel = {
      token: this.accessToken,
      refreshToken: refreshToken
    };
    return this.http.post(`${this.authUrl}refreshtoken/`, refreshTokenModel);
  }
}
