import { DbCollection, EntitypeContext, IQueryable } from 'entitype/src';
import { Course } from './Course';
import { Instructor } from './Instructor';
import { Student } from './Student';

export class UniversityContext extends EntitypeContext {
  constructor() {
    super();
  }

  @DbCollection(Student)
  students: IQueryable<Student>;

  @DbCollection(Course)
  courses: IQueryable<Course>;

  @DbCollection(Instructor)
  instructors: IQueryable<Instructor>;
}
