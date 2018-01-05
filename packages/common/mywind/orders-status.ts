import { Column, Entity, OneToMany } from 'entitype';

import { Order } from './order';

@Entity('orders_status')
export class OrdersStatus {
  
  @Column({ columnName: `id`, type: `tinyint(4)`, nullable: false, primaryKey: true, default: null })
  id: number;
  
  @Column({ columnName: `status_name`, type: `varchar(50)`, nullable: false, default: null })
  statusName: string;
  
  @OneToMany(type => Order, x => x.statusId)
  orders: Order[];
}
