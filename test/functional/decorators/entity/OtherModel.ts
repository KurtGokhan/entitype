import { Model } from './Model';
import { Column, OneToOne } from 'src';

export class OtherModel {
  @Column().primaryKey()
  id: number;

  @Column()
  name: string;

  @OneToOne(OtherModel, x => x.parent_id)
  parent: Model;

  @Column()
  parent_id: number;
}
