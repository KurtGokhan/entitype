import { ChildModel } from './ChildModel';
import { Column, OneToOne } from 'entitype';


export class Model {
  @Column().primaryKey()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => ChildModel, x => x.parent_id)
  child: ChildModel;
}
