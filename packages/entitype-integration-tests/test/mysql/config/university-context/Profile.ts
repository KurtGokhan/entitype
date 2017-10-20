import { Column, OneToOne, Entity } from 'entitype';

@Entity()
export class Profile {
  @Column().primaryKey()
  id: number;

  @Column().nullable(false)
  fullname: string;

  @Column()
  address?: string;

  @Column()
  birthdate?: Date;

  @Column()
  photo?: Buffer;
}
