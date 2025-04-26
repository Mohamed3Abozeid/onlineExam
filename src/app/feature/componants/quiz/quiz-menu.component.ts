import { question } from './../../interfaces/question-i';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExamService } from '../../../shared/services/exam.service';
import { ActivatedRoute } from '@angular/router';
import { ExamI } from '../../interfaces/exam-i';
// import { question } from '../../interfaces/question-i';

@Component({
  selector: 'app-quiz-menu',
  imports: [NgxSliderModule, CommonModule, FormsModule],
  templateUrl: './quiz-menu.component.html',
  styleUrl: './quiz-menu.component.scss',
})
export class QuizMenuComponent implements OnInit, OnDestroy {
  private readonly _ExamService = inject(ExamService);
  private readonly _activatedRoute = inject(ActivatedRoute);
  subjectId!: string;
  exams!: ExamI[];
  currentIndex = 0;
  timeLeft = 150;
  timer: any;
  dangerTime = false;
  percent = 0;
  questions2!: question[];
  examEnded = false;
  score = 0;
  numberOfQuestions!: number;

  ngOnInit() {
    // this.formatTime(120);
    this.getSubjectId();
    this.getExamBySubject(this.subjectId);
  }

  questions = [
    {
      text: 'What is the capital of Egypt?',
      options: ['Cairo', 'Alexandria', 'Giza', 'Luxor'],
      selected: '',
      correct: 'Cairo',
    },
  ];

  sliderOptions: Options = {
    floor: 0,
    ceil: this.questions.length,
    step: 1,
    showTicks: false,
    showTicksValues: true,
  };

  nextQuestion() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    }
  }

  prevQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  startTimer() {
    clearInterval(this.timer);
    this.timeLeft = 1000;
    this.timer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft < 120) {
        this.dangerTime = true;
      }
      if (this.timeLeft == 0) {
        this.endQuiz();
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    const paddedMin = min.toString().padStart(2, '0');
    const paddedSec = sec.toString().padStart(2, '0');
    return `${paddedMin}:${paddedSec}`;
  }

  endQuiz() {
    clearInterval(this.timer);
    this.calculateScore();
    this.examEnded = true;
  }

  calculateScore() {
    const correctAnswers = this.questions.filter(
      (q) => q.selected === q.correct
    ).length;
    this.score = correctAnswers;
    this.percent = Math.round((correctAnswers / this.questions.length) * 100);
  }

  getExamBySubject(subjectId: string) {
    this._ExamService.getExamBySubject(subjectId).subscribe({
      next: (res) => {
        this.exams = res.exams;
        console.log(this.exams);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getSubjectId() {
    this._activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.subjectId = res.get('id')!;
      },
    });
  }

  getQuestionsbyExamId(examId: string) {
    this._ExamService.getQuestionsByExamId(examId).subscribe({
      next: (res) => {
        this.questions2 = res.questions;
        this.questions = this.transformFun(this.questions2);
        this.numberOfQuestions = this.questions.length;
        console.log(this.questions);
        this.sliderOptions = {
          ...this.sliderOptions, // keep previous settings
          ceil: this.numberOfQuestions - 1, // update ceil only
        };
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  transformFun(questionArr: question[]) {
    return questionArr.map((question) => {
      return {
        text: question.question,
        options: question.answers.map((ans) => ans.answer),
        selected: '',
        correct:
          question.answers.find((ans) => ans.key === question.correct)?.key ||
          '',
      };
    });
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
