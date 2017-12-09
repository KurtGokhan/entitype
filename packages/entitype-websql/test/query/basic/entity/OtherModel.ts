import { Column, Entity } from 'entitype';

@Entity('other')
export class OtherModel {
  @Column().type.int()
  id: number;

  @Column()
  name: string;
}
