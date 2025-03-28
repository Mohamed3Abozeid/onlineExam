import { Router } from '@angular/router';
import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthLibService } from 'auth-Lib';
import { CustomBtnComponent } from '../../../custom/custom-btn/custom-btn.component';
import { CustomErrorComponent } from '../../../custom/custom-error/custom-error.component';
import { IconsBarComponent } from '../../../custom/icons-bar/icons-bar.component';

@Component({
  selector: 'app-reset-code',
  imports: [
    ReactiveFormsModule,
    IconsBarComponent,
    CustomBtnComponent,
    CustomErrorComponent,
  ],
  templateUrl: './reset-code.component.html',
  styleUrl: './reset-code.component.scss',
})
export class ResetCodeComponent {
  constructor(private _AuthLibService: AuthLibService) {}
  private readonly _Router = inject(Router);

  codeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required]),
  });

  isLogin: boolean = false;
  passwordType: boolean = false;
  errorMassage: String = '';
  @ViewChild('codeInput') codeInput!: ElementRef<HTMLInputElement>;
  @Output() userCode = new EventEmitter<string>();
  sendCode() {
    this.userCode.emit(this.codeForm.value.code);
  }
  codeFunc() {
    this.isLogin = true;
    this._AuthLibService.codeReset(this.codeForm.value).subscribe({
      next: (data) => {
        this.isLogin = false;
        if (data.status == 'Success') {
          this.sendCode();
        }
      },

      error: (err) => {
        this.isLogin = false;
        console.log(err);
        this.codeInput.nativeElement.classList.add('is-invalid');
      },
    });
  }
}
