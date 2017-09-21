import { Column } from 'entitype';

export class StudentsCourses {
  @Column().primaryKey()
  student_id: number;

  @Column().primaryKey()
  course_id: number;
}
