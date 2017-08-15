import { Column } from 'src/decorators/Column';

export class ChildModel {
  @Column().type('int')
  id: number;

  @Column()
  name: string;
}
