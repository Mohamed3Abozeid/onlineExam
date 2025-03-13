import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IconsBarComponent } from '../custom/icons-bar/icons-bar.component';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, IconsBarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor() {}
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required,Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  isLogin: boolean = false;
  passwordType: boolean = false;

  loginFun() {}

  passwordTogle() {
    if (this.passwordType) {
      this.passwordType = false;
    } else {
      this.passwordType = true;
    }
  }
}
