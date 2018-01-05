import { Column, Entity, OneToMany } from 'entitype';

import { OrderDetail } from './order-detail';

@Entity('order_details_status')
export class OrderDetailsStatus {
  
  @Column({ columnName: `id`, type: `int(11)`, nullable: false, primaryKey: true, default: null })
  id: number;
  
  @Column({ columnName: `status_name`, type: `varchar(50)`, nullable: false, default: null })
  statusName: string;
  
  @OneToMany(type => OrderDetail, x => x.statusId)
  orderDetails: OrderDetail[];
}
