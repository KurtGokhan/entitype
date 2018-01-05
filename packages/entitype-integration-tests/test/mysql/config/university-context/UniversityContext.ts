import { DbCollection, DbSet, EntitypeContext } from 'entitype';
import { Course } from './Course';
import { Instructor } from './Instructor';
import { Student } from './Student';

export class UniversityContext extends EntitypeContext {
  constructor() {
    super();
  }

  @DbCollection(() => Student)
  students: DbSet<Student>;

  @DbCollection(() => Course)
  courses: DbSet<Course>;

  @DbCollection(() => Instructor)
  instructors: DbSet<Instructor>;
}
