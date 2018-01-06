import { Column, Entity, OneToMany } from 'entitype';

import { InventoryTransaction } from './inventory-transaction';
import { OrderDetail } from './order-detail';
import { PurchaseOrderDetail } from './purchase-order-detail';

@Entity('products')
export class Product {

  @Column({ columnName: `supplier_ids`, type: `longtext`, default: null })
  supplierIds?: string;

  @Column({ columnName: `id`, type: `int(11)`, nullable: false, generated: true, primaryKey: true, default: null })
  id: number;

  @Column({ columnName: `product_code`, type: `varchar(25)`, default: null, index: true })
  productCode?: string;

  @Column({ columnName: `product_name`, type: `varchar(50)`, default: null })
  productName?: string;

  @Column({ columnName: `description`, type: `longtext`, default: null })
  description?: string;

  @Column({ columnName: `standard_cost`, type: `decimal(19,4)`, default: 0.0000 })
  standardCost?: string;

  @Column({ columnName: `list_price`, type: `decimal(19,4)`, nullable: false, default: 0.0000 })
  listPrice: string;

  @Column({ columnName: `reorder_level`, type: `int(11)`, default: null })
  reorderLevel?: number;

  @Column({ columnName: `target_level`, type: `int(11)`, default: null })
  targetLevel?: number;

  @Column({ columnName: `quantity_per_unit`, type: `varchar(50)`, default: null })
  quantityPerUnit?: string;

  @Column({ columnName: `discontinued`, type: `tinyint(1)`, nullable: false, default: 0 })
  discontinued: boolean;

  @Column({ columnName: `minimum_reorder_quantity`, type: `int(11)`, default: null })
  minimumReorderQuantity?: number;

  @Column({ columnName: `category`, type: `varchar(50)`, default: null })
  category?: string;

  @Column({ columnName: `attachments`, type: `longblob`, default: null })
  attachments?: Buffer;

  @OneToMany(type => InventoryTransaction, x => x.productId)
  inventoryTransactions: InventoryTransaction[];

  @OneToMany(type => OrderDetail, x => x.productId)
  orderDetails: OrderDetail[];

  @OneToMany(type => PurchaseOrderDetail, x => x.productId)
  purchaseOrderDetails: PurchaseOrderDetail[];
}
