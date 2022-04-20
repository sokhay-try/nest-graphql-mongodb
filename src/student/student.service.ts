import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
  ) {}

  createStudent(createStudentInput: CreateStudentInput): Promise<Student> {
    const { firstName, lastName } = createStudentInput;
    const student = this.studentRepo.create({
      id: uuid(),
      firstName,
      lastName,
    });
    return this.studentRepo.save(student);
  }

  getStudents(): Promise<Student[]> {
    return this.studentRepo.find();
  }

  getStudent(id: string): Promise<Student> {
    return this.studentRepo.findOne({ where: { id } });
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    console.log('========', studentIds);
    return this.studentRepo.find({
      where: {
        id: {
          $in: studentIds,
        },
      },
    });
  }
}
