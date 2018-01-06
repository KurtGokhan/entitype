import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'entitype';

import { Customer } from './customer';
import { Employee } from './employee';
import { InventoryTransaction } from './inventory-transaction';
import { Invoice } from './invoice';
import { OrderDetail } from './order-detail';
import { OrdersStatus } from './orders-status';
import { OrdersTaxStatus } from './orders-tax-status';
import { Shipper } from './shipper';

@Entity('orders')
export class Order {

  @Column({ columnName: `id`, type: `int(11)`, nullable: false, generated: true, primaryKey: true, default: null })
  id: number;

  @Column({ columnName: `employee_id`, type: `int(11)`, default: null, index: true })
  employeeId?: number;

  @Column({ columnName: `customer_id`, type: `int(11)`, default: null, index: true })
  customerId?: number;

  @Column({ columnName: `order_date`, type: `datetime`, default: null })
  orderDate?: Date;

  @Column({ columnName: `shipped_date`, type: `datetime`, default: null })
  shippedDate?: Date;

  @Column({ columnName: `shipper_id`, type: `int(11)`, default: null, index: true })
  shipperId?: number;

  @Column({ columnName: `ship_name`, type: `varchar(50)`, default: null })
  shipName?: string;

  @Column({ columnName: `ship_address`, type: `longtext`, default: null })
  shipAddress?: string;

  @Column({ columnName: `ship_city`, type: `varchar(50)`, default: null })
  shipCity?: string;

  @Column({ columnName: `ship_state_province`, type: `varchar(50)`, default: null })
  shipStateProvince?: string;

  @Column({ columnName: `ship_zip_postal_code`, type: `varchar(50)`, default: null, index: true })
  shipZipPostalCode?: string;

  @Column({ columnName: `ship_country_region`, type: `varchar(50)`, default: null })
  shipCountryRegion?: string;

  @Column({ columnName: `shipping_fee`, type: `decimal(19,4)`, default: 0.0000 })
  shippingFee?: string;

  @Column({ columnName: `taxes`, type: `decimal(19,4)`, default: 0.0000 })
  taxes?: string;

  @Column({ columnName: `payment_type`, type: `varchar(50)`, default: null })
  paymentType?: string;

  @Column({ columnName: `paid_date`, type: `datetime`, default: null })
  paidDate?: Date;

  @Column({ columnName: `notes`, type: `longtext`, default: null })
  notes?: string;

  @Column({ columnName: `tax_rate`, type: `double`, default: 0 })
  taxRate?: number;

  @Column({ columnName: `tax_status_id`, type: `tinyint(4)`, default: null, index: true })
  taxStatusId?: number;

  @Column({ columnName: `status_id`, type: `tinyint(4)`, default: 0, index: true })
  statusId?: number;

  @OneToMany(type => InventoryTransaction, x => x.customerOrderId)
  inventoryTransactions: InventoryTransaction[];

  @OneToMany(type => Invoice, x => x.orderId)
  invoices: Invoice[];

  @OneToOne(type => OrderDetail, x => x.orderId)
  orderDetails: OrderDetail;

  @ManyToOne(type => Order, x => x.customerId)
  customer: Customer;

  @ManyToOne(type => Order, x => x.employeeId)
  employee: Employee;

  @ManyToOne(type => Order, x => x.statusId)
  status: OrdersStatus;

  @ManyToOne(type => Order, x => x.taxStatusId)
  taxStatus: OrdersTaxStatus;

  @ManyToOne(type => Order, x => x.shipperId)
  shipper: Shipper;
}
