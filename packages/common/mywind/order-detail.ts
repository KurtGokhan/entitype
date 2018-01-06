import { Column, Entity, ManyToOne, OneToOne } from 'entitype';

import { Order } from './order';
import { OrderDetailsStatus } from './order-details-status';
import { Product } from './product';

@Entity('order_details')
export class OrderDetail {

  @Column({ columnName: `id`, type: `int(11)`, nullable: false, generated: true, primaryKey: true, default: null })
  id: number;

  @Column({ columnName: `order_id`, type: `int(11)`, nullable: false, default: null, index: true })
  orderId: number;

  @Column({ columnName: `product_id`, type: `int(11)`, default: null, index: true })
  productId?: number;

  @Column({ columnName: `quantity`, type: `decimal(18,4)`, nullable: false, default: 0.0000 })
  quantity: string;

  @Column({ columnName: `unit_price`, type: `decimal(19,4)`, default: 0.0000 })
  unitPrice?: string;

  @Column({ columnName: `discount`, type: `double`, nullable: false, default: 0 })
  discount: number;

  @Column({ columnName: `status_id`, type: `int(11)`, default: null, index: true })
  statusId?: number;

  @Column({ columnName: `date_allocated`, type: `datetime`, default: null })
  dateAllocated?: Date;

  @Column({ columnName: `purchase_order_id`, type: `int(11)`, default: null, index: true })
  purchaseOrderId?: number;

  @Column({ columnName: `inventory_id`, type: `int(11)`, default: null, index: true })
  inventoryId?: number;

  @ManyToOne(type => OrderDetail, x => x.statusId)
  status: OrderDetailsStatus;

  @OneToOne(type => OrderDetail, x => x.orderId)
  order: Order;

  @ManyToOne(type => OrderDetail, x => x.productId)
  product: Product;
}
