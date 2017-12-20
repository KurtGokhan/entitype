import { Column, Entity } from '../../../src';

@Entity()
export class StudentCourseMap {
  @Column().primaryKey()
  student_id: number;

  @Column().primaryKey()
  course_id: number;
}
