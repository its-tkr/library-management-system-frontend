import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptorInterceptor implements HttpInterceptor {
  
  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    var token=localStorage.getItem('token')?.toString();
    if(token){
      return next.handle(req.clone({setHeaders:{"auth-token":token}}));
    }
    
    return next.handle(req);
  }
}
