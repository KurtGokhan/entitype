import { ChildModel } from './ChildModel';
import { Column } from 'src/decorators/Column';
import { OneToOne } from 'src/decorators/OneToOne';

export class Model {
  @Column().primaryKey()
  id: number;

  @Column()
  name: string;

  @OneToOne(ChildModel, x => x.parent_id)
  child: ChildModel;
}
