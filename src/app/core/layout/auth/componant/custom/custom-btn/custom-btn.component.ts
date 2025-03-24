import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-btn',
  imports: [],
  templateUrl: './custom-btn.component.html',
  styleUrl: './custom-btn.component.scss',
})
export class CustomBtnComponent {
  @Input() isLoading!: boolean;
}
