import { Column, Entity, OneToMany } from 'entitype';

import { Order } from './order';

@Entity('orders_tax_status')
export class OrdersTaxStatus {
  
  @Column({ columnName: `id`, type: `tinyint(4)`, nullable: false, primaryKey: true, default: null })
  id: number;
  
  @Column({ columnName: `tax_status_name`, type: `varchar(50)`, nullable: false, default: null })
  taxStatusName: string;
  
  @OneToMany(type => Order, x => x.taxStatusId)
  orders: Order[];
}
