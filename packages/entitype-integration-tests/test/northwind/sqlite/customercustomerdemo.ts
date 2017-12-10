import { Column, Entity } from 'entitype';


@Entity('customercustomerdemo')
export class Customercustomerdemo {
  
  @Column({ columnName: `CustomerID`, type: `varchar(255)`, nullable: false, primaryKey: true, default: null })
  customerId: string;
  
  @Column({ columnName: `CustomerTypeID`, type: `varchar(255)`, nullable: false, primaryKey: true, default: null })
  customerTypeId: string;
}
