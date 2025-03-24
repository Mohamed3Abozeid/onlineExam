import { Router } from '@angular/router';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { IconsBarComponent } from '../custom/icons-bar/icons-bar.component';
import { CustomBtnComponent } from '../custom/custom-btn/custom-btn.component';
import { AuthLibService } from 'auth-Lib';
@Component({
  selector: 'app-reset-code',
  imports: [ReactiveFormsModule, IconsBarComponent, CustomBtnComponent],
  templateUrl: './reset-code.component.html',
  styleUrl: './reset-code.component.scss',
})
export class ResetCodeComponent {
  constructor(private _AuthLibService: AuthLibService) {}
  private readonly _Router = inject(Router);

  codeForm: FormGroup = new FormGroup({
    code: new FormControl(null, [Validators.required]),
  });

  isLogin: boolean = false;
  passwordType: boolean = false;
  errorMassage: String = '';
  @ViewChild('codeInput') codeInput!: ElementRef<HTMLInputElement>;

  codeFunc() {
    console.log(this.codeForm.value);
    this.isLogin = true;
    this._AuthLibService.ForgetPassword(this.codeForm.value).subscribe({
      next: (data) => {
        this.isLogin = false;
        if (data.message == 'success') {
          this._Router.navigate(['/auth/New-Password']);
        } else {
          // when have error
          console.log(this.codeInput.nativeElement);
        }
      },

      error: (err) => {
        this.isLogin = false;
        console.log(err);
        this.codeInput.nativeElement.classList.add('is-invalid');

        console.log(this.codeInput.nativeElement);

        // when have error
      },
    });
  }
}
