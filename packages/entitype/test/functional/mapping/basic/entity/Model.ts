import { Column, OneToOne } from '../../../../../src';

import { ChildModel } from './ChildModel';
import { OtherModel } from './OtherModel';

export class Model {
  @Column().primaryKey()
  id: number;

  @Column()
  name: string;

  @OneToOne(type => Model, x => x.child_id)
  child: ChildModel;

  @Column()
  child_id: number;

  @OneToOne(type => OtherModel, x => x.parent_id)
  other: OtherModel;

}
