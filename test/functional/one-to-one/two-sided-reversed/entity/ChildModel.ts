import { Model } from './Model';
import { Column } from 'src/decorators/Column';
import { OneToOne } from 'src/decorators/OneToOne';

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
