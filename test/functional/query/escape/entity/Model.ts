import { Column } from 'src/decorators/Column';

export class Model {
  @Column().type('int')
  id: number;

  @Column()
  name: string;

  @Column()
  createdDate: Date;
}
