import { Column, ManyToMany, forwardRef } from 'src';

import { Course } from './Course';
import { StudentsCourses } from './Students_Courses';

export class Student {
  @Column().primaryKey()
  id: number;

  @Column()
  name: string;

  @ManyToMany(forwardRef(() => Course), forwardRef(() => StudentsCourses), x => x.student_id, x => x.course_id)
  courses: Course[];
}
