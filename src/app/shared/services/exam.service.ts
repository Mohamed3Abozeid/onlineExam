import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private readonly _HttpClient = inject(HttpClient);
  baseUrl = 'https://exam.elevateegy.com/api/v1';

  constructor() {}

  GetAllExams(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + '/exams');
  }

  getExamBySubject(subjectId: string): Observable<any> {
    return this._HttpClient.get(this.baseUrl + '/exams?subject=' + subjectId);
  }

  getQuestionsByExamId(examId: string): Observable<any> {
    return this._HttpClient.get(this.baseUrl + '/questions?exam=' + examId);
  }
}
