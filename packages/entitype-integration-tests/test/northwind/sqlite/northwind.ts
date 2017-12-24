import { DbCollection, EntitypeContext, IQueryable } from 'entitype';

import { Category } from './category';
import { Customer } from './customer';
import { Customerdemographic } from './customerdemographic';
import { Employee } from './employee';
import { Order } from './order';
import { OrderDetail } from './order-detail';
import { Product } from './product';
import { Region } from './region';
import { Shipper } from './shipper';
import { Supplier } from './supplier';
import { Territory } from './territory';

export class NorthwindContext extends EntitypeContext {

  @DbCollection(() => Category)
  categories: IQueryable<Category>;

  @DbCollection(() => Customerdemographic)
  customerdemographics: IQueryable<Customerdemographic>;

  @DbCollection(() => Customer)
  customers: IQueryable<Customer>;

  @DbCollection(() => Employee)
  employees: IQueryable<Employee>;

  @DbCollection(() => OrderDetail)
  orderDetails: IQueryable<OrderDetail>;

  @DbCollection(() => Order)
  orders: IQueryable<Order>;

  @DbCollection(() => Product)
  products: IQueryable<Product>;

  @DbCollection(() => Region)
  regions: IQueryable<Region>;

  @DbCollection(() => Shipper)
  shippers: IQueryable<Shipper>;

  @DbCollection(() => Supplier)
  suppliers: IQueryable<Supplier>;

  @DbCollection(() => Territory)
  territories: IQueryable<Territory>;
}
