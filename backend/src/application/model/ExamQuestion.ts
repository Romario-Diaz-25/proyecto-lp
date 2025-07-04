import { IExamQuestionSchema } from "./interfaces/exam-questions/exam-question-schema.interface";
import { IExamQuestion } from "./interfaces/exam-questions/exam-question.interface";

export class ExamQuestion {
  private constructor(
    private id: number,
    private questionText: string,
    private answerOptions: string[] | string,
    private correctAnswerIndex: number,
    private examId: number
  ) {}

  getId(): number {
    return this.id;
  }

  static create(question: {
    id: number;
    questionText: string;
    answerOptions: string[] | string;
    correctAnswerIndex: number;
    examId: number;
  }): ExamQuestion {
    return new ExamQuestion(
      question.id,
      question.questionText,
      question.answerOptions,
      question.correctAnswerIndex,
      question.examId
    );
  }

  public toJSON(): {
    id: number;
    questionText: string;
    answerOptions: string[] | string;
    correctAnswerIndex: number;
    examId: number;
  } {
    return {
      id: this.id,
      questionText: this.questionText,
      answerOptions: this.answerOptions,
      correctAnswerIndex: this.correctAnswerIndex,
      examId: this.examId,
    };
  }

  public toSchema(): IExamQuestionSchema {
    return {
      id: this.id,
      questionText: this.questionText,
    };
  }

  public static fromSchema(question: IExamQuestion): ExamQuestion {
    return new ExamQuestion(
      question.id,
      question.questionText,
      question.answerOptions,
      question.correctAnswerIndex,
      question.examId
    );
  }
}
