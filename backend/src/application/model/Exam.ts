import { IExamSchema } from "./interfaces/exams/exam-schema.interface";
import { IExam } from "./interfaces/exams/exam.interface";

export class Exam {
  private constructor(
    private id: number,
    private title: string,
    private description: string,
    private maxScore: number,
    private minimumScoreToApprove: number,
    private icon: string
  ) {}

  getId(): number {
    return this.id;
  }

  static create(exam: {
    id: number;
    title: string;
    description: string;
    maxScore: number;
    minimumScoreToApprove: number;
    icon: string;
  }): Exam {
    return new Exam(
      exam.id,
      exam.title,
      exam.description,
      exam.maxScore,
      exam.minimumScoreToApprove,
      exam.icon
    );
  }

  public toJSON(): {
    id: number;
    title: string;
    description: string;
    maxScore: number;
    minimumScoreToApprove: number;
    icon: string;
  } {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      maxScore: this.maxScore,
      minimumScoreToApprove: this.minimumScoreToApprove,
      icon: this.icon,
    };
  }

  public toSchema(): IExamSchema {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      maxScore: this.maxScore,
      minimumScoreToApprove: this.minimumScoreToApprove,
      icon: this.icon,
    };
  }

  public static fromSchema(exam: IExam): Exam {
    return new Exam(
      exam.id,
      exam.title,
      exam.description,
      exam.maxScore,
      exam.minimumScoreToApprove,
      exam.icon
    );
  }
}
