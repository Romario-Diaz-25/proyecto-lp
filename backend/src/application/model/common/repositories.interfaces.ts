import { ICourseRepository } from "../interfaces/courses/course-repository.interface";
import { IExamQuestionRepository } from "../interfaces/exam-questions/exam-question-repository.interface";
import { IExamRepository } from "../interfaces/exams/exam-repository.interface";
import { IStudentCourseRepository } from "../interfaces/student-courses/student-course-repository.interface";
import { IStudentRepository } from "../interfaces/students/student-repository.interface";

export interface IRepositories {
  studentRepository: IStudentRepository;
  studentCourseRepository: IStudentCourseRepository;
  courseRepository: ICourseRepository;
  examQuestionRepository: IExamQuestionRepository;
  examRepository: IExamRepository;
}
