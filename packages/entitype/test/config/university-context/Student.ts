import { Column, Entity, ManyToMany, OneToOne } from '../../../src';
import { Course } from './Course';
import { Profile } from './Profile';
import { StudentCourseMap } from './StudentCourseMap';

@Entity()
export class Student {
  @Column().primaryKey()
  id: number;

  @OneToOne(() => Student, x => x.profile_id)
  profile: Profile;

  @Column()
  profile_id: number;

  @Column()
  startYear: number;

  @ManyToMany(() => Course, () => StudentCourseMap, x => x.student_id, x => x.course_id)
  courses: Course[];
}
