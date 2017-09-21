import { Column } from 'entitype';

export class ChildModel {
  @Column().primaryKey()
  id: number;

  @Column()
  name: string;

  @Column()
  parent_id: number;
}
