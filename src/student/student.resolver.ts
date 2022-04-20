import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStudentInput } from './create-student.input';
import { StudentService } from './student.service';
import { StudentType } from './student.type';

@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private studentSV: StudentService) {}

  @Mutation((returns) => StudentType)
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentSV.createStudent(createStudentInput);
  }

  @Query((returns) => [StudentType])
  async getStudents() {
    return this.studentSV.getStudents();
  }

  @Query((returns) => StudentType)
  async getStudent(@Args('id') id: string) {
    return this.studentSV.getStudent(id);
  }
}
