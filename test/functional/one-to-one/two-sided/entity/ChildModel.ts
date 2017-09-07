import { Model } from './Model';
import { Column } from 'src/decorators/Column';
import { OneToOne } from 'src/decorators/OneToOne';

export class ChildModel {
  @Column().primaryKey()
  id: number;

  @Column()
  name: string;

  @OneToOne(Model, x => x.child_id)
  parent: Model;
}
