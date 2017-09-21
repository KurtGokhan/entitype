import { Column, OneToOne } from 'entitype';

import { ChildModel } from './ChildModel';

export class Model {
  @Column().primaryKey()
  id: number;

  @Column()
  name: string;

  @OneToOne(Model, x => x.child_id)
  child: ChildModel;

  @Column()
  child_id: number;
}
