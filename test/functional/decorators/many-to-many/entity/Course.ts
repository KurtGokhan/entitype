import { Column, ManyToMany, forwardRef } from 'src';

import { Student } from './Student';
import { StudentsCourses } from './Students_Courses';

export class Course {
  @Column().primaryKey()
  id: number;

  @Column()
  name: string;

  @ManyToMany(forwardRef(() => Student), forwardRef(() => StudentsCourses), x => x.course_id, x => x.student_id)
  students: Student[];
}
