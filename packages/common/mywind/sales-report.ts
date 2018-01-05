import { Column, Entity } from 'entitype';


@Entity('sales_reports')
export class SalesReport {
  
  @Column({ columnName: `group_by`, type: `varchar(50)`, nullable: false, primaryKey: true, default: null })
  groupBy: string;
  
  @Column({ columnName: `display`, type: `varchar(50)`, default: null })
  display?: string;
  
  @Column({ columnName: `title`, type: `varchar(50)`, default: null })
  title?: string;
  
  @Column({ columnName: `filter_row_source`, type: `longtext`, default: null })
  filterRowSource?: string;
  
  @Column({ columnName: `default`, type: `tinyint(1)`, nullable: false, default: 0 })
  default: number;
}
