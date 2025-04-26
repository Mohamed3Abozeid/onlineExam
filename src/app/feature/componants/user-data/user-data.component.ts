import { Component, inject, Inject } from '@angular/core';
import { QuizSectionComponent } from '../quiz-section/quiz-section.component';
import { UserDataService } from '../../../shared/services/user-data.service';
import { User } from '../../../shared/interfaces/user';

@Component({
  selector: 'app-user-data',
  imports: [QuizSectionComponent],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss',
})
export class UserDataComponent {
  private readonly _userDataService = inject(UserDataService);
  userData!: User;
  constructor() {
    this.userData = this._userDataService.userData;
  }
}
