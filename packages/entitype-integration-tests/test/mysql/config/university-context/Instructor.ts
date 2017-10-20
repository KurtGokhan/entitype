import { Profile } from './Profile';
import { Column, OneToOne, Entity, OneToMany } from 'entitype';
import { Course } from './Course';

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
