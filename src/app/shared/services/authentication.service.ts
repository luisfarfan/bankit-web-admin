import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AUTH_ME_STORAGE, AUTH_REFRESH_TOKEN, AUTH_TOKEN_STORAGE } from "../../const";
import { AuthenticationEndpoint } from "../endpoints/authentication.endpoint";
import { AuthToken, Credentials, SocialCredentials } from "../interfaces/auth.interface";
import { BehaviorSubject, EMPTY, Observable, of } from "rxjs";
import { User } from "../interfaces/user.interface";
import { catchError, switchMap, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    protected authenticationSubscription = new BehaviorSubject(AuthenticationService.getAuthData());

    constructor(private http: HttpClient, private router: Router) {
    }

    static getToken(): string {
        return localStorage.getItem(AUTH_TOKEN_STORAGE);
    }

    static getRefreshToken(): string {
        return localStorage.getItem(AUTH_REFRESH_TOKEN);
    }

    static setToken(access: string, refresh?: string): void {
        localStorage.setItem(AUTH_TOKEN_STORAGE, access);
        if (refresh) {
            localStorage.setItem(AUTH_REFRESH_TOKEN, refresh);
        }
    }

    static getAuthData(): User {
        return JSON.parse(localStorage.getItem(AUTH_ME_STORAGE));
    }

    static setAuthData(data: User) {
        localStorage.setItem(AUTH_ME_STORAGE, JSON.stringify(data));
    }

    static setRefreshToken(refresh: string) {
        localStorage.setItem(AUTH_REFRESH_TOKEN, refresh);
    }

    authenticate(credentials: Credentials): Observable<User> {
        return this.http.post<AuthToken>(AuthenticationEndpoint.authToken, credentials)
            .pipe(
                tap(data => AuthenticationService.setToken(data.access, data.refresh)),
                switchMap(data => this.me())
            );
    }

    refreshToken(refresh: string): Observable<{ access: string }> {
        return this.http.post<{ access: string }>(AuthenticationEndpoint.refreshToken, {refresh})
            .pipe(
                tap(token => AuthenticationService.setToken(token.access))
            )
    }

    verifyToken(): Observable<any> {
        return this.http.post(AuthenticationEndpoint.verifyToken, {token: AuthenticationService.getToken()})
            .pipe(
                catchError(err => {
                    return this.refreshToken(AuthenticationService.getRefreshToken())
                        .pipe(
                            catchError(err1 => {
                                this.logout();
                                this.router.navigate(['']);
                                return EMPTY;
                            })
                        )
                })
            );
    }

    socialAuthenticate(credentials: SocialCredentials): Observable<User> {
        return this.http.post<AuthToken>(AuthenticationEndpoint.socialToken, credentials)
            .pipe(
                tap(data => AuthenticationService.setToken(data.access, data.refresh)),
                switchMap(data => this.me())
            );
    }

    getAuthenticationSubscription(): Observable<boolean> {
        return this.authenticationSubscription.asObservable()
            .pipe(switchMap(() => {
                return of(!!AuthenticationService.getAuthData())
            }));
    }

    me(): Observable<User> {
        return this.http.get<User>(AuthenticationEndpoint.me)
            .pipe(
                tap(user => {
                    AuthenticationService.setAuthData(user);
                    this.authenticationSubscription.next(user);
                }));
    }

    enterAsAnonymous(): Observable<User> {
        return this.authenticate(environment.anonymousCredentials);
    }

    logout() {
        localStorage.clear();
        this.authenticationSubscription.next(null);
    }
}
