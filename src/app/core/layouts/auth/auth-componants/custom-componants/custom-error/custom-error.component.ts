import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-custom-error',
  imports: [],
  templateUrl: './custom-error.component.html',
  styleUrl: './custom-error.component.scss',
})
export class CustomErrorComponent {
  @Input() formData!: FormGroup;
  @Input() inputName!: string;
}
