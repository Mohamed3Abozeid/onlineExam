import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthEndPoints } from './enums/AuthApi.endPoints';
import { AuthApi } from './base/AuthApi';
import { AuthApiService } from './adaptors/auth-api.abstract';
import {
  ForgetPasswordData,
  loginData,
  newPasswordData,
  reigisterData,
  resetCodeData,
} from './interface/form-data';

@Injectable({
  providedIn: 'root',
})
export class AuthLibService implements AuthApi {
  constructor(
    private _HttpClient: HttpClient,
    private _authApiService: AuthApiService
  ) {}

  login(data: loginData): Observable<any> {
    return this._HttpClient.post(AuthEndPoints.LOGIN, data).pipe(
      map((res) => this._authApiService.adapt(res)),
      catchError((error) => {
        return throwError(() => new Error(error.message));
      })
    );
  }
  register(data: reigisterData): Observable<any> {
    return this._HttpClient.post(AuthEndPoints.REGISTER, data).pipe(
      map((res) => this._authApiService.adapt(res)),
      catchError((error) => {
        return throwError(() => new Error(error.message));
      })
    );
  }

  ForgetPassword(data: ForgetPasswordData): Observable<any> {
    return this._HttpClient.post(AuthEndPoints.FORGET_PASSWORD, data);
  }

  codeReset(data: resetCodeData): Observable<any> {
    return this._HttpClient.post(AuthEndPoints.VERFIY_CODE, data);
  }
  resetPassword(data: newPasswordData): Observable<any> {
    return this._HttpClient.put(AuthEndPoints.RESET_PASSWORD, data);
  }
}
