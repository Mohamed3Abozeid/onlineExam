import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IconsBarComponent } from '../custom/icons-bar/icons-bar.component';
import { CustomBtnComponent } from '../custom/custom-btn/custom-btn.component';
import { AuthLibService } from 'auth-Lib';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    IconsBarComponent,
    CustomBtnComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private _AuthLibService: AuthLibService,
    private _Router: Router
  ) {}
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  isLogin: boolean = false;
  passwordType: boolean = false;
  errorMassage: string = '';

  loginFun() {
    this.isLogin = true;

    this._AuthLibService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.isLogin = false;
        if (res.error !== null) {
          console.log('badnews', res);

          this.errorMassage = 'incorect email or password';
        } else {
          this._Router.navigate(['/auth/reigister']);
        }
      },
    });
  }

  passwordTogle() {
    if (this.passwordType) {
      this.passwordType = false;
    } else {
      this.passwordType = true;
    }
  }
}
