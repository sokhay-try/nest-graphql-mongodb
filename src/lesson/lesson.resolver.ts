import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { StudentService } from 'src/student/student.service';
import { AssignStudentToLessonInput } from './assign-student-to-lesson.input';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(
    private lessonSV: LessonService,
    private studentSV: StudentService,
  ) {}

  @Query((returns) => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonSV.getLesson(id);
  }

  @Query((returns) => [LessonType])
  lessons() {
    return this.lessonSV.getLessons();
  }

  @Mutation((returns) => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonSV.createLesson(createLessonInput);
  }

  @Mutation((returns) => LessonType)
  assignStudentToLesson(
    @Args('assignStudentToLessonInput')
    assignStudentToLessonInput: AssignStudentToLessonInput,
  ) {
    return this.lessonSV.assignStudentToLesson(assignStudentToLessonInput);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return this.studentSV.getManyStudents(lesson.students);
  }
}
