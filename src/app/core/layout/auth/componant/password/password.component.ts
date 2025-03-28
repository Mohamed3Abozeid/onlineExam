import { Component } from '@angular/core';
import { ForgetPasswordComponent } from './PasswordComponant/forget-password/forget-password.component';
import { ResetCodeComponent } from "./PasswordComponant/reset-code/reset-code.component";
import { NewPasswordComponent } from "./PasswordComponant/new-password/new-password.component";

@Component({
  selector: 'app-password',
  imports: [ForgetPasswordComponent, ResetCodeComponent, NewPasswordComponent],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss',
})
export class PasswordComponent {
  constructor() {
  }
  userEmail: string = '';
  resetCode: string = '';
  resevEmail(value: string) {
    this.userEmail = value;
  }
  resevCode(value: string) {
    this.resetCode = value;
  }
}
