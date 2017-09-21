import { DbCollection, EntitypeContext, IQueryable } from 'entitype';

import { Course } from './Course';
import { Student } from './Student';

export class Context extends EntitypeContext {
  constructor() {
    super();
  }

  @DbCollection(Student)
  students: IQueryable<Student>;

  @DbCollection(Course)
  courses: IQueryable<Course>;
}
