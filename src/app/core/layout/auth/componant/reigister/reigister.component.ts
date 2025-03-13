import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IconsBarComponent } from '../custom/icons-bar/icons-bar.component';

@Component({
  selector: 'app-reigister',
  imports: [ReactiveFormsModule, RouterLink, IconsBarComponent],
  templateUrl: './reigister.component.html',
  styleUrl: './reigister.component.scss',
})
export class ReigisterComponent {
  constructor() {}
  loginForm: FormGroup = new FormGroup({
    fName: new FormControl(null, [Validators.required]),
    lName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    rePassword: new FormControl(null, [Validators.required]),
  });

  isLogin: boolean = false;
  passwordType: boolean = false;

  reigisterFunc() {}

  passwordTogle() {
    if (this.passwordType) {
      this.passwordType = false;
    } else {
      this.passwordType = true;
    }
  }
}
