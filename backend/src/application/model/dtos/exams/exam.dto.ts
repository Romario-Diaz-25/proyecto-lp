import { IExam } from "../../interfaces/exams/exam.interface";

export class ExamDTO {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly maxScore: number;
  readonly minimumScoreToApprove: number;

  constructor(data: IExam) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.maxScore = data.maxScore;
    this.minimumScoreToApprove = data.minimumScoreToApprove;
  }
}
