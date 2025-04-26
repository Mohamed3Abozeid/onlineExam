import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  userData: User;
  constructor() {
    const userDataString = localStorage.getItem('userData');
    this.userData = userDataString
      ? (JSON.parse(userDataString) as User)
      : ({} as User);
  }
}
