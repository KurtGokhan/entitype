import { Column, Entity, ManyToMany, OneToMany } from 'entitype';

import { Customercustomerdemo } from './customercustomerdemo';
import { Customerdemographic } from './customerdemographic';
import { Order } from './order';

@Entity('customers')
export class Customer {
  
  @Column({ columnName: `CustomerID`, type: `varchar(255)`, nullable: false, primaryKey: true, default: null })
  customerId: string;
  
  @Column({ columnName: `CompanyName`, type: `varchar(255)`, default: null })
  companyName?: string;
  
  @Column({ columnName: `ContactName`, type: `varchar(255)`, default: null })
  contactName?: string;
  
  @Column({ columnName: `ContactTitle`, type: `varchar(255)`, default: null })
  contactTitle?: string;
  
  @Column({ columnName: `Address`, type: `varchar(255)`, default: null })
  address?: string;
  
  @Column({ columnName: `City`, type: `varchar(255)`, default: null })
  city?: string;
  
  @Column({ columnName: `Region`, type: `varchar(255)`, default: null })
  region?: string;
  
  @Column({ columnName: `PostalCode`, type: `varchar(255)`, default: null })
  postalCode?: string;
  
  @Column({ columnName: `Country`, type: `varchar(255)`, default: null })
  country?: string;
  
  @Column({ columnName: `Phone`, type: `varchar(255)`, default: null })
  phone?: string;
  
  @Column({ columnName: `Fax`, type: `varchar(255)`, default: null })
  fax?: string;
  
  @ManyToMany(type => Customerdemographic, joinType => Customercustomerdemo, x => x.customerId, x => x.customerTypeId)
  customercustomerdemos: Customerdemographic[];
  
  @OneToMany(type => Order, x => x.customerId)
  orders: Order[];
}
