import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceInterceptor implements HttpInterceptor {

  public _token = '';
  public token_valido = false;

  constructor(private injector: Injector, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const OAuth = this.injector.get(SpotifyService);
    const token = OAuth.obtenerToken();

    let reqClone = req;
    if (req.url === environment.tokenUrl) {

      let ahora = new Date();
      localStorage.setItem( 'hora_token', ahora.getTime().toString() );

      if (localStorage.getItem('hora_token')) {
        let horaToken = new Date();
        horaToken.setTime(Number(localStorage.getItem('hora_token')));
        horaToken.setHours(1);

        if (horaToken >= new Date()) {
          console.log('Token Valido');
          this.token_valido = true;
          this._token = localStorage.getItem('token');
        } else {
          console.log('Token Invalido');
          reqClone = req.clone({
            setHeaders: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new HttpParams()
              .set('grant_type', environment.grant_type)
              .set('client_id', environment.client_id)
              .set('client_secret', environment.client_secret)
          });
        }
      }
      // reqClone = req.clone({
      //   setHeaders: { 'Content-Type': 'application/x-www-form-urlencoded' },
      //   body: new HttpParams()
      //     .set('grant_type', environment.grant_type)
      //     .set('client_id', environment.client_id)
      //     .set('client_secret', environment.client_secret)
      // });
    } else {
      reqClone = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(reqClone).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          OAuth.updateToken();
          this.router.navigateByUrl('home');
        }
        console.log('Sucedio un error');
        console.log('Resgistrado en el log file');
        // console.warn(err);
        return throwError( err );
      })
    );
  }
}
