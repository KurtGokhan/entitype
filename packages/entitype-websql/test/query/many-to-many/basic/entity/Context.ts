import { DbCollection, DbSet, EntitypeContext } from 'entitype';

import { Course } from './Course';
import { Student } from './Student';

export class Context extends EntitypeContext {
  constructor() {
    super();
  }

  @DbCollection(() => Student)
  students: DbSet<Student>;

  @DbCollection(() => Course)
  courses: DbSet<Course>;
}
