import { forwardRef } from '../../../../src/common/forwardRef';
import { Model } from './Model';
import { Column, OneToOne } from 'src';

export class ChildModel {
  @Column().primaryKey()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Model, x => x.child_id)
  parent: Model;
}
