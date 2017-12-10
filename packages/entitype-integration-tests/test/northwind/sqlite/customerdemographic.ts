import { Column, Entity, ManyToMany } from 'entitype';

import { Customer } from './customer';
import { Customercustomerdemo } from './customercustomerdemo';

@Entity('customerdemographics')
export class Customerdemographic {
  
  @Column({ columnName: `CustomerTypeID`, type: `varchar(255)`, nullable: false, primaryKey: true, default: null })
  customerTypeId: string;
  
  @Column({ columnName: `CustomerDesc`, type: `varchar(255)`, default: null })
  customerDesc?: string;
  
  @ManyToMany(type => Customer, joinType => Customercustomerdemo, x => x.customerTypeId, x => x.customerId)
  customercustomerdemos: Customer[];
}
