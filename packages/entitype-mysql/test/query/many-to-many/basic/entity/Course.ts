import { Column } from 'entitype';
import { ManyToMany } from 'entitype';

import { Student } from './Student';
import { StudentsCourses } from './Students_Courses';

export class Course {
  @Column().primaryKey()
  id: number;

  @Column()
  name: string;

  @ManyToMany(Student, StudentsCourses, x => x.course_id, x => x.student_id)
  students: Student[];
}
