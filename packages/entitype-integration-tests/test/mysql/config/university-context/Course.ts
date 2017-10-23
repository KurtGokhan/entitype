import { Column, Entity, ManyToMany, ManyToOne } from 'entitype';
import { Instructor } from './Instructor';
import { Student } from './Student';
import { StudentCourseMap } from './StudentCourseMap';

@Entity()
export class Course {
  @Column().primaryKey()
  id: number;

  @ManyToOne(() => Course, x => x.instructor_id)
  instructor: Instructor;

  @Column()
  instructor_id: number;

  @ManyToMany(() => Student, () => StudentCourseMap, x => x.course_id, x => x.student_id)
  students: Student[];

  @Column()
  weekDay: number;

  @Column()
  hourSlot: number;

  @Column()
  duration: number;
}
