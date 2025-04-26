import { Component, inject, Input, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IconsBarComponent } from '../../../custom-componants/icons-bar/icons-bar.component';
import { CustomErrorComponent } from '../../../custom-componants/custom-error/custom-error.component';
import { CustomBtnComponent } from '../../../custom-componants/custom-btn/custom-btn.component';
import { AuthLibService } from 'auth-Lib';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-password',
  imports: [
    ReactiveFormsModule,
    IconsBarComponent,
    CustomBtnComponent,
    CustomErrorComponent,
  ],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss',
})
export class NewPasswordComponent implements OnDestroy {
  private readonly _Router = inject(Router);
  private readonly _AuthLibService = inject(AuthLibService);
  isLogin: boolean = false;
  passwordType: boolean = false;
  newPasswordSub!: Subscription;
  @Input() userEmail!: string;
  passwordForm: FormGroup = new FormGroup(
    {
      password: new FormControl(null, [Validators.required]),
      rePassword: new FormControl(null, [Validators.required]),
    },
    { validators: this.passwordMatchValidator() }
  );

  constructor() {}

  newPasswordFunc() {
    this.isLogin = true;
    this.newPasswordSub = this._AuthLibService
      .resetPassword({
        email: this.userEmail,
        newPassword: this.passwordForm.value.password,
      })
      .subscribe({
        next: (data) => {
          this.isLogin = false;

          this._Router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.isLogin = false;
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

  passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('password')?.value;
      const rePassword = formGroup.get('rePassword')?.value;

      if (password !== rePassword) {
        return { passwordMismatch: true };
      }
      return null;
    };
  }
  ngOnDestroy(): void {
    if (this.newPasswordSub) this.newPasswordSub.unsubscribe();
  }
}
