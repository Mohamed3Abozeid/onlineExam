import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { IconsBarComponent } from '../custom/icons-bar/icons-bar.component';
@Component({
  selector: 'app-reset-code',
  imports: [ReactiveFormsModule, IconsBarComponent],
  templateUrl: './reset-code.component.html',
  styleUrl: './reset-code.component.scss',
})
export class ResetCodeComponent {
  constructor() {}
  private readonly _Router = inject(Router);

  codeForm: FormGroup = new FormGroup({
    code: new FormControl(null, [Validators.required]),
  });

  isLogin: boolean = false;
  passwordType: boolean = false;

  codeFunc() {
    console.log(this.codeForm.value);
    this._Router.navigate(['/auth/New-Password']);
  }
}
