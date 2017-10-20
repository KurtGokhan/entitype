import { Column, OneToOne } from 'src';

import { Model } from './Model';
import { forwardRef } from 'src/common/forwardRef';

export class ChildModel {
  @Column().primaryKey()
  id: number;

  @Column()
  name: string;

  @OneToOne((() => Model), x => x.child_id)
  parent: Model;
}
