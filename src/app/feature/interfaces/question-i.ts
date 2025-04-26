import { ExamI } from './exam-i';
import { SubjectI } from './subject-i';

export interface question {
  _id: string;
  question: string;
  answers: Answer[];
  type: string;
  correct: string;
  subject: SubjectI;
  exam: ExamI;
  createdAt: string;
}

export interface Answer {
  answer: string;
  key: string;
}
