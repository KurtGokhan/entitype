import { Column } from 'src/decorators/Column';

export class ChildModel {
  @Column().primaryKey()
  id: number;

  @Column()
  name: string;
}
