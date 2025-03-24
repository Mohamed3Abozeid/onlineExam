import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IconsBarComponent } from '../custom/icons-bar/icons-bar.component';
import { CustomBtnComponent } from "../custom/custom-btn/custom-btn.component";

@Component({
  selector: 'app-new-password',
  imports: [ReactiveFormsModule, IconsBarComponent, CustomBtnComponent],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss',
})
export class NewPasswordComponent {
  constructor() {}
  private readonly _Router = inject(Router);
  isLogin: boolean = false;
  passwordType: boolean = false;
  passwordForm: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required]),
    rePassword: new FormControl(null, [Validators.required]),
  });

  newPasswordFunc() {
    console.log('hallow from function');

    console.log(this.passwordForm.value);
    this._Router.navigate(['/auth/login']);
  }



  passwordTogle() {
    if (this.passwordType) {
      this.passwordType = false;
    } else {
      this.passwordType = true;
    }
  }
}
