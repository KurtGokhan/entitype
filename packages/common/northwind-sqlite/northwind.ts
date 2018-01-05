import { DbCollection, DbSet, EntitypeContext } from 'entitype';

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
  categories: DbSet<Category>;

  @DbCollection(() => Customerdemographic)
  customerdemographics: DbSet<Customerdemographic>;

  @DbCollection(() => Customer)
  customers: DbSet<Customer>;

  @DbCollection(() => Employee)
  employees: DbSet<Employee>;

  @DbCollection(() => OrderDetail)
  orderDetails: DbSet<OrderDetail>;

  @DbCollection(() => Order)
  orders: DbSet<Order>;

  @DbCollection(() => Product)
  products: DbSet<Product>;

  @DbCollection(() => Region)
  regions: DbSet<Region>;

  @DbCollection(() => Shipper)
  shippers: DbSet<Shipper>;

  @DbCollection(() => Supplier)
  suppliers: DbSet<Supplier>;

  @DbCollection(() => Territory)
  territories: DbSet<Territory>;
}
