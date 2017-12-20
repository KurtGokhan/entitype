import { Column, OneToOne } from 'entitype/src';
import { Model } from './Model';

export class ChildModel {
  @Column().primaryKey()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Model, x => x.child_id)
  parent: Model;
}
