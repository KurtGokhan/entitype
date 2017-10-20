import { Student } from './Student';
import { Instructor } from './Instructor';
import { Course } from './Course';
import { EntitypeContext, DbCollection, IQueryable } from 'entitype';

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
