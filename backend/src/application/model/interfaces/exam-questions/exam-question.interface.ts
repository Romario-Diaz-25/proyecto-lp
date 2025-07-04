export interface IExamQuestion {
  id: number;
  questionText: string;
  answerOptions: string[] | string;
  correctAnswerIndex: number;
  examId: number;
}
