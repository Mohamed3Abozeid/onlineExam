import { Injectable } from '@angular/core';
import { Adaptor } from '../interface/adaptor';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService implements Adaptor {
  constructor() {}

  adapt(data: any) {
    return {
      massage: data.message,
      token: data.token,
      userData: data.user,
    };
  }
}
