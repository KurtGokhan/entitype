import { Column, Entity, ManyToOne } from 'entitype';

import { InventoryTransaction } from './inventory-transaction';
import { Product } from './product';
import { PurchaseOrder } from './purchase-order';

@Entity('purchase_order_details')
export class PurchaseOrderDetail {
  
  @Column({ columnName: `id`, type: `int(11)`, nullable: false, generated: true, primaryKey: true, default: null })
  id: number;
  
  @Column({ columnName: `purchase_order_id`, type: `int(11)`, nullable: false, default: null, index: true })
  purchaseOrderId: number;
  
  @Column({ columnName: `product_id`, type: `int(11)`, default: null, index: true })
  productId?: number;
  
  @Column({ columnName: `quantity`, type: `decimal(18,4)`, nullable: false, default: null })
  quantity: number;
  
  @Column({ columnName: `unit_cost`, type: `decimal(19,4)`, nullable: false, default: null })
  unitCost: number;
  
  @Column({ columnName: `date_received`, type: `datetime`, default: null })
  dateReceived?: Date;
  
  @Column({ columnName: `posted_to_inventory`, type: `tinyint(1)`, nullable: false, default: 0 })
  postedToInventory: number;
  
  @Column({ columnName: `inventory_id`, type: `int(11)`, default: null, index: true })
  inventoryId?: number;
  
  @ManyToOne(type => PurchaseOrderDetail, x => x.inventoryId)
  inventory: InventoryTransaction;
  
  @ManyToOne(type => PurchaseOrderDetail, x => x.productId)
  product: Product;
  
  @ManyToOne(type => PurchaseOrderDetail, x => x.purchaseOrderId)
  purchaseOrder: PurchaseOrder;
}
