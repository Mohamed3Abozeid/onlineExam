import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomBtnComponent } from '../custom/custom-btn/custom-btn.component';
import { AuthLibService } from 'auth-Lib';

@Component({
  selector: 'app-reigister',
  imports: [ReactiveFormsModule, RouterLink, CustomBtnComponent],
  templateUrl: './reigister.component.html',
  styleUrl: './reigister.component.scss',
})
export class ReigisterComponent {
  constructor(
    private _AuthLibService: AuthLibService,
    private _Router: Router
  ) {}
  registerForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [
      Validators.required,
      // Validators.pattern('/^[010|011|012|015]{8}$/'),
    ]),
  });

  isLogin: boolean = false;
  massageError: string = '';

  reigisterFunc() {
    this.isLogin = true;

    this._AuthLibService.register(this.registerForm.value).subscribe({
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
}
