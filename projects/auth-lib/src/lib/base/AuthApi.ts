import { Observable } from 'rxjs';

export abstract class AuthApi {
  constructor() {}

  abstract login(data: any): Observable<any>;
  abstract register(data: any): Observable<any>;
  abstract codeReset(data: any): Observable<any>;
  abstract resetPassword(data: any): Observable<any>;
}
