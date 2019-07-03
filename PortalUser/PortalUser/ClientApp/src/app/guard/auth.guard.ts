import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from "@angular/router";
import { AuthService } from "../auth.services";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<boolean> | boolean {
      debugger;
      if (state.url !== '/login' && !this.authService.accessToken) {
        this.router.navigate(['/login']);
        return false;
      }

      return true;
    }

}
