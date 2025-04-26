import { Component, inject, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomBtnComponent } from '../custom-componants/custom-btn/custom-btn.component';
import { AuthLibService } from 'auth-Lib';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reigister',
  imports: [ReactiveFormsModule, RouterLink, CustomBtnComponent],
  templateUrl: './reigister.component.html',
  styleUrl: './reigister.component.scss',
})
export class ReigisterComponent implements OnDestroy {
  isLogin: boolean = false;
  massageError: string = '';
  registSub!: Subscription;
  private readonly _AuthLibService = inject(AuthLibService);
  private readonly _Router = inject(Router);

  registerForm: FormGroup = new FormGroup(
    {
      username: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0-2,5][0-9]{8}$/),
      ]),
    },
    { validators: this.passwordMatchValidator() }
  );
  constructor() {}

  reigisterFunc() {
    this.isLogin = true;

    this.registSub = this._AuthLibService
      .register(this.registerForm.value)
      .subscribe({
        next: (res) => {
          this.isLogin = false;
          if (res.massage == 'success') {
            this._Router.navigate(['/auth/login']);
          }
        },
        error: (err) => {
          this.isLogin = false;
          this.massageError = 'Incorected Inputs';
        },
      });
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
    if (this.registSub) {
      this.registSub.unsubscribe();
    }
  }
}
