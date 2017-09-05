import { StudentsCourses } from './Students_Courses';
import { Course } from './Course';
import { Column } from 'src/decorators/Column';
import { ManyToMany } from 'src/decorators/ManyToMany';

export class Student {
  @Column().primaryKey()
  id: number;

  @Column()
  name: string;

  @ManyToMany(Course, StudentsCourses, x => x.student_id, x => x.course_id)
  courses: Course[];
}
