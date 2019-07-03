import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, Subject, Subscription } from "rxjs";
import { switchMap, first, catchError } from "rxjs/operators";
import { AuthService } from "../auth.services";
import { of } from "rxjs/observable/of";
import { _throw as throwError, _throw } from 'rxjs/observable/throw';
import { Router } from "@angular/router";



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  refreshInProgress: boolean = false;
  subscription: Subscription;
  private subject: Subject<boolean> = new Subject<boolean>();

  constructor(private injector: Injector, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //clone need because req immutable(неизменяемый)
    let clone = req.clone();

    if (clone.url.toLowerCase().includes('https://localhost:44322/api/auth/token')) {
      return next.handle(req);
    }
    return this.request(clone).pipe(
      switchMap((req: HttpRequest<any>) => next.handle(req)),
      catchError((error: HttpErrorResponse) => this.responseError(clone, error)),
    );
  }

  private request(req: HttpRequest<any>): Observable<HttpRequest<any> | HttpEvent<any>> {
    if (this.refreshInProgress) {
      return this.doRequest(req);
    }
    return this.setToken(req);
  }

  private setToken(req: HttpRequest<any>): Observable<HttpRequest<any>> {
    let service = this.injector.get(AuthService);
    if (service.accessToken)
      req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${service.accessToken}`) });
    return of(req);
  }

  private doRequest(req: HttpRequest<any>) {
    let http = this.injector.get(HttpClient);
    return this.subject.pipe(
      first(),
      switchMap((status: boolean) => {
        return status ? http.request(req) : _throw('session expired');
      })
    );
  }

  private responseError(req: HttpRequest<any>, res: HttpErrorResponse): Observable<HttpEvent<any>> {
    if (res.status != 401) {
        return  _throw(res);
    } else {

    if (!this.refreshInProgress)
      this.refreshInProgress = true;

    let service = this.injector.get(AuthService);

    this.subscription = service.refresh().subscribe(() => {
      this.refreshInProgress = false;
      this.subject.next(true);
    }, () => {
      this.refreshInProgress = false;
      this.subject.next(false);
      service.logout();
    });

      return this.doRequest(req);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
