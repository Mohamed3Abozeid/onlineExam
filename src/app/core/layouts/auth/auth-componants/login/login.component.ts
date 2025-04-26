import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IconsBarComponent } from '../custom-componants/icons-bar/icons-bar.component';
import { CustomBtnComponent } from '../custom-componants/custom-btn/custom-btn.component';
import { AuthLibService } from 'auth-Lib';
import { CustomErrorComponent } from '../custom-componants/custom-error/custom-error.component';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    IconsBarComponent,
    CustomBtnComponent,
    CustomErrorComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy, OnInit {
  loginSub!: Subscription;
  isLogin: boolean = false;
  passwordType: boolean = false;
  errorMassage: string = '';
  loginForm!: FormGroup;
  private readonly _AuthLibService = inject(AuthLibService);
  private readonly _Router = inject(Router);
  private readonly _toastrService = inject(ToastrService);

  constructor() {}
  ngOnInit(): void {
    this.loginFom();
  }

  loginFom() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  loginFun() {
    this.isLogin = true;

    this.loginSub = this._AuthLibService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.isLogin = false;
        this._toastrService.success('Login Successfully', 'Success');
        this._Router.navigate(['/home']);
        console.log(res);
        localStorage.setItem('token', res.token);
        localStorage.setItem('userData', JSON.stringify(res.userData));
      },
      error: (err) => {
        this.isLogin = false;
        this.errorMassage = 'incorect email or password';
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

  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }
}
