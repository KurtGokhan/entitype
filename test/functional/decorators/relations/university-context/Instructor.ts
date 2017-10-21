import { Column, Entity, OneToMany, OneToOne } from 'src';
import { Course } from './Course';
import { Profile } from './Profile';

@Entity()
export class Instructor {
  @Column().primaryKey()
  id: number;

  @OneToOne(() => Instructor, x => x.profile_id)
  profile: Profile;

  @Column()
  profile_id: number;

  @OneToMany(Course, x => x.instructor_id)
  courses: Course[];
}
