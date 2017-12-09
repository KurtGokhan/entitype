import { Column, OneToOne } from 'entitype';

import { ChildModel } from './ChildModel';

export class Model {
  @Column().primaryKey()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => ChildModel, x => x.parent_id)
  child: ChildModel;
}
