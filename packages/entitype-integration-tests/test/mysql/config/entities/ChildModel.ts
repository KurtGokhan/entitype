import { Column, OneToOne } from 'entitype';
import { Model } from './Model';

export class ChildModel {
  @Column().primaryKey()
  id: number;

  @Column()
  name: string;

  @OneToOne(ChildModel, x => x.parent_id)
  parent: Model;

  @Column()
  parent_id: number;
}
