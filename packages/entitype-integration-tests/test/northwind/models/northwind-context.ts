import { DbCollection, EntitypeContext, IQueryable } from 'entitype';

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
  customers: IQueryable<Customer>;
  
  @DbCollection(() => Employee)
  employees: IQueryable<Employee>;
  
  @DbCollection(() => InventoryTransactionType)
  inventoryTransactionTypes: IQueryable<InventoryTransactionType>;
  
  @DbCollection(() => InventoryTransaction)
  inventoryTransactions: IQueryable<InventoryTransaction>;
  
  @DbCollection(() => Invoice)
  invoices: IQueryable<Invoice>;
  
  @DbCollection(() => OrderDetail)
  orderDetails: IQueryable<OrderDetail>;
  
  @DbCollection(() => OrderDetailsStatus)
  orderDetailsStatuses: IQueryable<OrderDetailsStatus>;
  
  @DbCollection(() => Order)
  orders: IQueryable<Order>;
  
  @DbCollection(() => OrdersStatus)
  ordersStatuses: IQueryable<OrdersStatus>;
  
  @DbCollection(() => OrdersTaxStatus)
  ordersTaxStatuses: IQueryable<OrdersTaxStatus>;
  
  @DbCollection(() => Privilege)
  privileges: IQueryable<Privilege>;
  
  @DbCollection(() => Product)
  products: IQueryable<Product>;
  
  @DbCollection(() => PurchaseOrderDetail)
  purchaseOrderDetails: IQueryable<PurchaseOrderDetail>;
  
  @DbCollection(() => PurchaseOrderStatus)
  purchaseOrderStatuses: IQueryable<PurchaseOrderStatus>;
  
  @DbCollection(() => PurchaseOrder)
  purchaseOrders: IQueryable<PurchaseOrder>;
  
  @DbCollection(() => SalesReport)
  salesReports: IQueryable<SalesReport>;
  
  @DbCollection(() => Shipper)
  shippers: IQueryable<Shipper>;
  
  @DbCollection(() => String)
  strings: IQueryable<String>;
  
  @DbCollection(() => Supplier)
  suppliers: IQueryable<Supplier>;
}
