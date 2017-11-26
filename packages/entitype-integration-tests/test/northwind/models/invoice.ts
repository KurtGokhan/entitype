import { Column, Entity, ManyToOne } from 'entitype';

import { Order } from './order';

@Entity('invoices')
export class Invoice {
  
  @Column({ columnName: `id`, type: `int(11)`, nullable: false, generated: true, primaryKey: true, default: null })
  id: number;
  
  @Column({ columnName: `order_id`, type: `int(11)`, default: null, index: true })
  orderId?: number;
  
  @Column({ columnName: `invoice_date`, type: `datetime`, default: null })
  invoiceDate?: Date;
  
  @Column({ columnName: `due_date`, type: `datetime`, default: null })
  dueDate?: Date;
  
  @Column({ columnName: `tax`, type: `decimal(19,4)`, default: 0.0000 })
  tax?: number;
  
  @Column({ columnName: `shipping`, type: `decimal(19,4)`, default: 0.0000 })
  shipping?: number;
  
  @Column({ columnName: `amount_due`, type: `decimal(19,4)`, default: 0.0000 })
  amountDue?: number;
  
  @ManyToOne(type => Invoice, x => x.orderId)
  order: Order;
}
