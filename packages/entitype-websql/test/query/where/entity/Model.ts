import { Column } from 'entitype';

export class Model {
  @Column().type.int()
  id: number;

  @Column()
  name: string;

  @Column()
  active: boolean;

  @Column()
  date: Date;
}
