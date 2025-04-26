import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  private readonly _httpClient = inject(HttpClient);
  constructor() {}

  getSubjects(limit: number): Observable<any> {
    return this._httpClient.get(
      'https://exam.elevateegy.com/api/v1/subjects?limit=' + limit
    );
  }

  getSubjectById(id: string) {
    return this._httpClient.get(
      `https://exam.elevateegy.com/api/v1/subjects/${id}`
    );
  }
}
