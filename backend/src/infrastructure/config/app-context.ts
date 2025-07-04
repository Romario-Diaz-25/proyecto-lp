import { IStudentRepository } from "../../application/model/interfaces/students/student-repository.interface";
import { StudentsRepository } from "../../application/repositories/students/students.repository";
import { IRepositories } from "../../application/model/common/repositories.interfaces";
import { db } from "../database";
import { IStudentCourseRepository } from "../../application/model/interfaces/student-courses/student-course-repository.interface";
import { StudentCourseRepository } from "../../application/repositories/student-courses/student-course.repository";
import { ICourseRepository } from "../../application/model/interfaces/courses/course-repository.interface";
import { CourseRepository } from "../../application/repositories/courses/course.repository";
import { IExamQuestionRepository } from "../../application/model/interfaces/exam-questions/exam-question-repository.interface";
import { ExamQuestionRepository } from "../../application/repositories/exam-question/exam-question.repository";
import { IExamRepository } from "../../application/model/interfaces/exams/exam-repository.interface";
import { ExamRepository } from "../../application/repositories/exams/exam.repository";

export class AppContext implements IRepositories {
  studentRepository: IStudentRepository;
  studentCourseRepository: IStudentCourseRepository;
  courseRepository: ICourseRepository;
  examQuestionRepository: IExamQuestionRepository;
  examRepository: IExamRepository;
  constructor() {
    this.studentRepository = new StudentsRepository(db);
    this.studentCourseRepository = new StudentCourseRepository(db);
    this.courseRepository = new CourseRepository(db);
    this.examQuestionRepository = new ExamQuestionRepository(db);
    this.examRepository = new ExamRepository(db);
  }
}
