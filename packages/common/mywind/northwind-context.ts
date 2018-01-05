import { DbCollection, DbSet, EntitypeContext } from 'entitype';

import { Customer } from './customer';
import { Employee } from './employee';
import { InventoryTransaction } from './inventory-transaction';
import { InventoryTransactionType } from './inventory-transaction-type';
import { Invoice } from './invoice';
import { Order } from './order';
import { OrderDetail } from './order-detail';
import { OrderDetailsStatus } from './order-details-status';
import { OrdersStatus } from './orders-status';
import { OrdersTaxStatus } from './orders-tax-status';
import { Privilege } from './privilege';
import { Product } from './product';
import { PurchaseOrder } from './purchase-order';
import { PurchaseOrderDetail } from './purchase-order-detail';
import { PurchaseOrderStatus } from './purchase-order-status';
import { SalesReport } from './sales-report';
import { Shipper } from './shipper';
import { String } from './string';
import { Supplier } from './supplier';

export class NorthwindContext extends EntitypeContext {
  
  @DbCollection(() => Customer)
  customers: DbSet<Customer>;
  
  @DbCollection(() => Employee)
  employees: DbSet<Employee>;
  
  @DbCollection(() => InventoryTransactionType)
  inventoryTransactionTypes: DbSet<InventoryTransactionType>;
  
  @DbCollection(() => InventoryTransaction)
  inventoryTransactions: DbSet<InventoryTransaction>;
  
  @DbCollection(() => Invoice)
  invoices: DbSet<Invoice>;
  
  @DbCollection(() => OrderDetail)
  orderDetails: DbSet<OrderDetail>;
  
  @DbCollection(() => OrderDetailsStatus)
  orderDetailsStatuses: DbSet<OrderDetailsStatus>;
  
  @DbCollection(() => Order)
  orders: DbSet<Order>;
  
  @DbCollection(() => OrdersStatus)
  ordersStatuses: DbSet<OrdersStatus>;
  
  @DbCollection(() => OrdersTaxStatus)
  ordersTaxStatuses: DbSet<OrdersTaxStatus>;
  
  @DbCollection(() => Privilege)
  privileges: DbSet<Privilege>;
  
  @DbCollection(() => Product)
  products: DbSet<Product>;
  
  @DbCollection(() => PurchaseOrderDetail)
  purchaseOrderDetails: DbSet<PurchaseOrderDetail>;
  
  @DbCollection(() => PurchaseOrderStatus)
  purchaseOrderStatuses: DbSet<PurchaseOrderStatus>;
  
  @DbCollection(() => PurchaseOrder)
  purchaseOrders: DbSet<PurchaseOrder>;
  
  @DbCollection(() => SalesReport)
  salesReports: DbSet<SalesReport>;
  
  @DbCollection(() => Shipper)
  shippers: DbSet<Shipper>;
  
  @DbCollection(() => String)
  strings: DbSet<String>;
  
  @DbCollection(() => Supplier)
  suppliers: DbSet<Supplier>;
}
