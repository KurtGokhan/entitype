import { ChildModel } from './ChildModel';
import { Column } from 'src/decorators/Column';
import { OneToOne } from 'src/decorators/OneToOne';

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
