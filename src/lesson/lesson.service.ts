import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentToLessonInput } from './assign-student-to-lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepo: Repository<Lesson>,
  ) {}

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate, students } = createLessonInput;
    const lesson = this.lessonRepo.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students,
    });

    return this.lessonRepo.save(lesson);
  }

  async getLesson(id: string): Promise<Lesson> {
    return this.lessonRepo.findOne({ where: { id } });
  }

  async getLessons(): Promise<Lesson[]> {
    return this.lessonRepo.find();
  }

  async assignStudentToLesson(
    assignStudentToLessonInput: AssignStudentToLessonInput,
  ): Promise<Lesson> {
    const { lessonId, studentIds } = assignStudentToLessonInput;
    const lesson = await this.lessonRepo.findOne({ where: { id: lessonId } });
    lesson.students = [...lesson.students, ...studentIds];

    return this.lessonRepo.save(lesson);
  }
}
