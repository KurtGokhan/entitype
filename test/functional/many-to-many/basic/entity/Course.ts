import { Student } from './Student';
import { StudentsCourses } from './Students_Courses';
import { Column } from 'src/decorators/Column';
import { ManyToMany } from 'src/decorators/ManyToMany';

export class Course {
  @Column().primaryKey()
  id: number;

  @Column()
  name: string;

  @ManyToMany(Student, StudentsCourses, x => x.course_id, x => x.student_id)
  students: Student[];
}
