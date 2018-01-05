import { Column, Entity } from 'entitype';


@Entity('strings')
export class String {
  
  @Column({ columnName: `string_id`, type: `int(11)`, nullable: false, generated: true, primaryKey: true, default: null })
  stringId: number;
  
  @Column({ columnName: `string_data`, type: `varchar(255)`, default: null })
  stringData?: string;
}
