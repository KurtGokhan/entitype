import { Column, Entity, OneToMany } from 'entitype';

import { Order } from './order';

@Entity('shippers')
export class Shipper {
  
  @Column({ columnName: `ShipperID`, type: `int(11)`, nullable: false, generated: true, primaryKey: true, default: null })
  shipperId: number;
  
  @Column({ columnName: `CompanyName`, type: `varchar(255)`, nullable: false, default: null })
  companyName: string;
  
  @Column({ columnName: `Phone`, type: `varchar(255)`, default: null })
  phone?: string;
  
  @OneToMany(type => Order, x => x.shipVia)
  orders: Order[];
}
