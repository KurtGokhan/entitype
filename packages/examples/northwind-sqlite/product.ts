import { Column, Entity, ManyToOne, OneToOne } from 'entitype';

import { Category } from './category';
import { OrderDetail } from './order-detail';
import { Supplier } from './supplier';

@Entity('products')
export class Product {
  
  @Column({ columnName: `ProductID`, type: `int(11)`, nullable: false, generated: true, primaryKey: true, default: null })
  productId: number;
  
  @Column({ columnName: `ProductName`, type: `varchar(255)`, nullable: false, default: null })
  productName: string;
  
  @Column({ columnName: `SupplierID`, type: `int(11)`, default: null, index: true })
  supplierId?: number;
  
  @Column({ columnName: `CategoryID`, type: `int(11)`, default: null })
  categoryId?: number;
  
  @Column({ columnName: `QuantityPerUnit`, type: `varchar(255)`, default: null })
  quantityPerUnit?: string;
  
  @Column({ columnName: `UnitPrice`, type: `decimal(10,0)`, default: 0 })
  unitPrice?: string;
  
  @Column({ columnName: `UnitsInStock`, type: `int(11)`, default: 0 })
  unitsInStock?: number;
  
  @Column({ columnName: `UnitsOnOrder`, type: `int(11)`, default: 0 })
  unitsOnOrder?: number;
  
  @Column({ columnName: `ReorderLevel`, type: `int(11)`, default: 0 })
  reorderLevel?: number;
  
  @Column({ columnName: `Discontinued`, type: `varchar(255)`, nullable: false, default: 0 })
  discontinued: string;
  
  @OneToOne(type => OrderDetail, x => x.productId)
  orderDetailsReference: OrderDetail;
  
  @OneToOne(type => Product, x => x.productId)
  product: Category;
  
  @ManyToOne(type => Product, x => x.supplierId)
  supplier: Supplier;
}
