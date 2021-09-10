import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/service/token.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // let authReq = request;
    // const token = this.tokenService.getToken();
    // if (token != null) {
    //   authReq = authReq.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    // }
    // return next.handle(authReq);



    const token = this.tokenService.getToken();

        if (token) {
            const cloned = req.clone({ 
              headers: req.headers.set('Authorization', 'Bearer ' + token) 
            });
            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }


  }
}
