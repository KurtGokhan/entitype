import { Column, Entity, ManyToOne, OneToOne } from 'entitype';

import { Customer } from './customer';
import { Employee } from './employee';
import { OrderDetail } from './order-detail';
import { Shipper } from './shipper';

@Entity('orders')
export class Order {
  
  @Column({ columnName: `OrderID`, type: `int(11)`, nullable: false, generated: true, primaryKey: true, default: null })
  orderId: number;
  
  @Column({ columnName: `CustomerID`, type: `varchar(255)`, default: null, index: true })
  customerId?: string;
  
  @Column({ columnName: `EmployeeID`, type: `int(11)`, default: null, index: true })
  employeeId?: number;
  
  @Column({ columnName: `OrderDate`, type: `datetime`, default: null })
  orderDate?: Date;
  
  @Column({ columnName: `RequiredDate`, type: `datetime`, default: null })
  requiredDate?: Date;
  
  @Column({ columnName: `ShippedDate`, type: `datetime`, default: null })
  shippedDate?: Date;
  
  @Column({ columnName: `ShipVia`, type: `int(11)`, default: null, index: true })
  shipVia?: number;
  
  @Column({ columnName: `Freight`, type: `decimal(10,0)`, default: 0 })
  freight?: string;
  
  @Column({ columnName: `ShipName`, type: `varchar(255)`, default: null })
  shipName?: string;
  
  @Column({ columnName: `ShipAddress`, type: `varchar(255)`, default: null })
  shipAddress?: string;
  
  @Column({ columnName: `ShipCity`, type: `varchar(255)`, default: null })
  shipCity?: string;
  
  @Column({ columnName: `ShipRegion`, type: `varchar(255)`, default: null })
  shipRegion?: string;
  
  @Column({ columnName: `ShipPostalCode`, type: `varchar(255)`, default: null })
  shipPostalCode?: string;
  
  @Column({ columnName: `ShipCountry`, type: `varchar(255)`, default: null })
  shipCountry?: string;
  
  @OneToOne(type => OrderDetail, x => x.orderId)
  orderDetailsReference: OrderDetail;
  
  @ManyToOne(type => Order, x => x.customerId)
  customer: Customer;
  
  @ManyToOne(type => Order, x => x.employeeId)
  employee: Employee;
  
  @ManyToOne(type => Order, x => x.shipVia)
  shipViaReference: Shipper;
}
