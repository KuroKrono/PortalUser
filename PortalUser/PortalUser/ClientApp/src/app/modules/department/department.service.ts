import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { IDepartment } from "../../models/department.model";


@Injectable()
export class DepartmentService {
  private apiUrl = 'https://localhost:44322/api/departments/'

  constructor(private http: HttpClient) {
  }

  getDepartmentsList(): Observable<IDepartment[]> {
    return this.http.get<IDepartment[]>(`${this.apiUrl}`);
  }

  create(department: IDepartment): Observable<any> {
    return this.http.post(this.apiUrl, department);
  }

  getDepartmentById(id: number): Observable<IDepartment> {
    return this.http.get<IDepartment>(this.apiUrl + id);
  }

  update(department: IDepartment): Observable<any> {
    return this.http.put(this.apiUrl, department);
  }
  
  delete(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + id);
  }
}
