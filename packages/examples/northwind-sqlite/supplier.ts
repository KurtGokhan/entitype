import { Column, Entity, OneToMany } from 'entitype';

import { Product } from './product';

@Entity('suppliers')
export class Supplier {
  
  @Column({ columnName: `SupplierID`, type: `int(11)`, nullable: false, generated: true, primaryKey: true, default: null })
  supplierId: number;
  
  @Column({ columnName: `CompanyName`, type: `varchar(255)`, nullable: false, default: null })
  companyName: string;
  
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
  
  @Column({ columnName: `HomePage`, type: `varchar(255)`, default: null })
  homePage?: string;
  
  @OneToMany(type => Product, x => x.supplierId)
  products: Product[];
}
