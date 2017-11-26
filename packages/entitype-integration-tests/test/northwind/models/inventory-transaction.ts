import { Column, Entity, ManyToOne, OneToMany } from 'entitype';

import { InventoryTransactionType } from './inventory-transaction-type';
import { Order } from './order';
import { Product } from './product';
import { PurchaseOrder } from './purchase-order';
import { PurchaseOrderDetail } from './purchase-order-detail';

@Entity('inventory_transactions')
export class InventoryTransaction {
  
  @Column({ columnName: `id`, type: `int(11)`, nullable: false, generated: true, primaryKey: true, default: null })
  id: number;
  
  @Column({ columnName: `transaction_type`, type: `tinyint(4)`, nullable: false, default: null, index: true })
  transactionType: number;
  
  @Column({ columnName: `transaction_created_date`, type: `datetime`, default: null })
  transactionCreatedDate?: Date;
  
  @Column({ columnName: `transaction_modified_date`, type: `datetime`, default: null })
  transactionModifiedDate?: Date;
  
  @Column({ columnName: `product_id`, type: `int(11)`, nullable: false, default: null, index: true })
  productId: number;
  
  @Column({ columnName: `quantity`, type: `int(11)`, nullable: false, default: null })
  quantity: number;
  
  @Column({ columnName: `purchase_order_id`, type: `int(11)`, default: null, index: true })
  purchaseOrderId?: number;
  
  @Column({ columnName: `customer_order_id`, type: `int(11)`, default: null, index: true })
  customerOrderId?: number;
  
  @Column({ columnName: `comments`, type: `varchar(255)`, default: null })
  comments?: string;
  
  @ManyToOne(type => InventoryTransaction, x => x.transactionType)
  transactionTypeReference: InventoryTransactionType;
  
  @ManyToOne(type => InventoryTransaction, x => x.customerOrderId)
  customerOrder: Order;
  
  @ManyToOne(type => InventoryTransaction, x => x.productId)
  product: Product;
  
  @ManyToOne(type => InventoryTransaction, x => x.purchaseOrderId)
  purchaseOrder: PurchaseOrder;
  
  @OneToMany(type => PurchaseOrderDetail, x => x.inventoryId)
  purchaseOrderDetails: PurchaseOrderDetail[];
}
