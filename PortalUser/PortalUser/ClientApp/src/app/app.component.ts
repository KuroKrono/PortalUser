import { Component } from '@angular/core';
import { AuthService } from './auth.services';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

 
  constructor(private authService: AuthService, private router: Router, private location: Location) {
   
  }

  ngOnInit() {
    
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
