import { Student } from './Student';
import { Course } from './Course';
import { IQueryable, EntitypeContext, DbCollection } from 'src';

export class Context extends EntitypeContext {
  constructor() {
    super();
  }

  @DbCollection(Student)
  students: IQueryable<Student>;

  @DbCollection(Course)
  courses: IQueryable<Course>;
}
