import { Column, Entity, ManyToOne, OneToMany } from 'entitype';

import { Employee } from './employee';
import { InventoryTransaction } from './inventory-transaction';
import { PurchaseOrderDetail } from './purchase-order-detail';
import { PurchaseOrderStatus } from './purchase-order-status';
import { Supplier } from './supplier';

@Entity('purchase_orders')
export class PurchaseOrder {
  
  @Column({ columnName: `id`, type: `int(11)`, nullable: false, generated: true, primaryKey: true, default: null })
  id: number;
  
  @Column({ columnName: `supplier_id`, type: `int(11)`, default: null, index: true })
  supplierId?: number;
  
  @Column({ columnName: `created_by`, type: `int(11)`, default: null, index: true })
  createdBy?: number;
  
  @Column({ columnName: `submitted_date`, type: `datetime`, default: null })
  submittedDate?: Date;
  
  @Column({ columnName: `creation_date`, type: `datetime`, default: null })
  creationDate?: Date;
  
  @Column({ columnName: `status_id`, type: `int(11)`, default: 0, index: true })
  statusId?: number;
  
  @Column({ columnName: `expected_date`, type: `datetime`, default: null })
  expectedDate?: Date;
  
  @Column({ columnName: `shipping_fee`, type: `decimal(19,4)`, nullable: false, default: 0.0000 })
  shippingFee: string;
  
  @Column({ columnName: `taxes`, type: `decimal(19,4)`, nullable: false, default: 0.0000 })
  taxes: string;
  
  @Column({ columnName: `payment_date`, type: `datetime`, default: null })
  paymentDate?: Date;
  
  @Column({ columnName: `payment_amount`, type: `decimal(19,4)`, default: 0.0000 })
  paymentAmount?: string;
  
  @Column({ columnName: `payment_method`, type: `varchar(50)`, default: null })
  paymentMethod?: string;
  
  @Column({ columnName: `notes`, type: `longtext`, default: null })
  notes?: string;
  
  @Column({ columnName: `approved_by`, type: `int(11)`, default: null })
  approvedBy?: number;
  
  @Column({ columnName: `approved_date`, type: `datetime`, default: null })
  approvedDate?: Date;
  
  @Column({ columnName: `submitted_by`, type: `int(11)`, default: null })
  submittedBy?: number;
  
  @OneToMany(type => InventoryTransaction, x => x.purchaseOrderId)
  inventoryTransactions: InventoryTransaction[];
  
  @OneToMany(type => PurchaseOrderDetail, x => x.purchaseOrderId)
  purchaseOrderDetails: PurchaseOrderDetail[];
  
  @ManyToOne(type => PurchaseOrder, x => x.createdBy)
  createdByReference: Employee;
  
  @ManyToOne(type => PurchaseOrder, x => x.statusId)
  status: PurchaseOrderStatus;
  
  @ManyToOne(type => PurchaseOrder, x => x.supplierId)
  supplier: Supplier;
}
