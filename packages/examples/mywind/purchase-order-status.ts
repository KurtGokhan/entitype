import { Column, Entity, OneToMany } from 'entitype';

import { PurchaseOrder } from './purchase-order';

@Entity('purchase_order_status')
export class PurchaseOrderStatus {
  
  @Column({ columnName: `id`, type: `int(11)`, nullable: false, primaryKey: true, default: null })
  id: number;
  
  @Column({ columnName: `status`, type: `varchar(50)`, default: null })
  status?: string;
  
  @OneToMany(type => PurchaseOrder, x => x.statusId)
  purchaseOrders: PurchaseOrder[];
}
