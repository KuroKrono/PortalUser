import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.services';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  admin : boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.admin = this.IsAdmin();
  }

  collapse() {
    this.isExpanded = false;
  }

  IsAdmin() {
    return this.authService.IsAdmin;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
