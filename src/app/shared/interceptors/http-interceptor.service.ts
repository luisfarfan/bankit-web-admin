import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from "../services/authentication.service";
import to from "await-to-js";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private router: Router,
                private authenticationService: AuthenticationService,
                private toastr: ToastrService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = AuthenticationService.getToken();
        const compositeToken = `Bearer ${token}`;
        if (token) {
            request = request.clone({
                setHeaders: {
                    'Accept-Language': 'es',
                    Authorization: compositeToken
                }
            });
        } else {
            request = request.clone({
                setHeaders: {
                    'Accept-Language': 'es'
                }
            });
        }


        return next.handle(request)
            .pipe(
                tap((event: HttpEvent<any>) => event, async (error) => {
                    if (error instanceof HttpErrorResponse) {
                        if (error.status === 401) {
                            await this.refreshTokenOrLogout();
                        }
                    }
                })
            );
    }

    async refreshTokenOrLogout(): Promise<void> {
        const [error, response] = await to(this.authenticationService.refreshToken(AuthenticationService.getRefreshToken()).toPromise())
        if (!response) {
            this.authenticationService.logout();
            this.toastr.error('Inicie sesión otra vez por favor!');
            await this.router.navigate(['']);
        }
    }
}
