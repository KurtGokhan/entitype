import { Column, Entity } from 'entitype';

@Entity()
export class StudentCourseMap {
  @Column().primaryKey()
  student_id: number;

  @Column().primaryKey()
  course_id: number;
}
