import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SubjectsService } from '../../services/subjects.service';
import { SubjectI } from '../../interfaces/subject-i';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quiz-section',
  imports: [RouterLink],
  templateUrl: './quiz-section.component.html',
  styleUrl: './quiz-section.component.scss',
})
export class QuizSectionComponent implements OnInit, OnDestroy {
  private readonly _subjectsService = inject(SubjectsService);
  allSubjects: SubjectI[] = [];

  constructor() {
    // This is a placeholder for the constructor logic
  }

  ngOnInit() {
    this.getSubjects(3);
  }

  getSubjects(limitSubjects: number) {
    this._subjectsService.getSubjects(limitSubjects).subscribe({
      next: (res) => {
        console.log(res.subjects);
        this.allSubjects = res.subjects;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  ngOnDestroy() {}
}
