import { Column, Entity } from 'entitype/src';

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
}
