import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomBtnComponent } from '../custom/custom-btn/custom-btn.component';
import { AuthLibService } from 'auth-Lib';
import { log } from 'console';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, RouterLink, CustomBtnComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  constructor(private _AuthLibService: AuthLibService) {}
  private readonly _Router = inject(Router);

  forgetForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  isLogin: boolean = false;
  passwordType: boolean = false;
  errorMassage: string = '';

  forgetFun() {
    // console.log(this.forgetForm.value);
    this.isLogin = true;
    this._AuthLibService.ForgetPassword(this.forgetForm.value).subscribe({
      next: (data) => {
        this.isLogin = false;
        if (data.message == 'success') {
          this._Router.navigate(['/auth/Verify-code']);
        } else {
          this.errorMassage = data.message;
        }
      },

      error: (err) => {
        this.isLogin = false;
        // console.log(err);

        this.errorMassage = 'There is no account with this email';
      },
    });
  }
}
