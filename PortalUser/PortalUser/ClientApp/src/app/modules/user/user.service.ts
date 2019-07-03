import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { IUserModel } from "../../models/user.model";


@Injectable()
export class UserService {
  private apiUrl = 'https://localhost:44322/api/users'

  constructor(private http: HttpClient) {
  }

  getUserList(): Observable<IUserModel[]> {
    return this.http.get<IUserModel[]>(`${this.apiUrl}`);
  }

  getUserById(id: number): Observable<IUserModel> {
    return this.http.get<IUserModel>(this.apiUrl + id);
  }

  update(user: IUserModel): Observable<any> {
    return this.http.put(this.apiUrl, user);
  }

  create(user: IUserModel): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
