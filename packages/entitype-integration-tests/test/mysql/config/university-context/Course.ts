import { StudentCourseMap } from './StudentCourseMap';
import { Student } from './Student';
import { Instructor } from './Instructor';
import { Profile } from './Profile';
import { Column, OneToOne, Entity, OneToMany, ManyToOne, ManyToMany } from 'entitype';

@Entity()
export class Course {
  @Column().primaryKey()
  id: number;

  @ManyToOne(Course, x => x.instructor_id)
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
