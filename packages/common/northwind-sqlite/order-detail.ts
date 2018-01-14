import { Column, Entity, OneToOne } from 'entitype';

import { Order } from './order';
import { Product } from './product';

@Entity('order details')
export class OrderDetail {

  @Column({ columnName: `OrderID`, type: `int(11)`, nullable: false, primaryKey: true, default: null })
  orderId: number;

  @Column({ columnName: `ProductID`, type: `int(11)`, nullable: false, primaryKey: true, default: null })
  productId: number;

  @Column({ columnName: `UnitPrice`, type: `decimal(10,0)`, nullable: false, default: 0 })
  unitPrice: string;

  @Column({ columnName: `Quantity`, type: `int(11)`, nullable: false, default: 1 })
  quantity: number;

  @Column({ columnName: `Discount`, type: `double`, nullable: false, default: 0 })
  discount: number;

  @OneToOne(type => OrderDetail, x => x.orderId)
  order: Order;

  @OneToOne(type => OrderDetail, x => x.productId)
  product: Product;
}
