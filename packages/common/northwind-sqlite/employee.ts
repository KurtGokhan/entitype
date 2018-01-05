import { Column, Entity, ManyToMany, OneToMany } from 'entitype';

import { Employeeterritory } from './employeeterritory';
import { Order } from './order';
import { Territory } from './territory';

@Entity('employees')
export class Employee {
  
  @Column({ columnName: `EmployeeID`, type: `int(11)`, nullable: false, generated: true, primaryKey: true, default: null })
  employeeId: number;
  
  @Column({ columnName: `LastName`, type: `varchar(255)`, default: null })
  lastName?: string;
  
  @Column({ columnName: `FirstName`, type: `varchar(255)`, default: null })
  firstName?: string;
  
  @Column({ columnName: `Title`, type: `varchar(255)`, default: null })
  title?: string;
  
  @Column({ columnName: `TitleOfCourtesy`, type: `varchar(255)`, default: null })
  titleOfCourtesy?: string;
  
  @Column({ columnName: `BirthDate`, type: `date`, default: null })
  birthDate?: Date;
  
  @Column({ columnName: `HireDate`, type: `date`, default: null })
  hireDate?: Date;
  
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
  
  @Column({ columnName: `HomePhone`, type: `varchar(255)`, default: null })
  homePhone?: string;
  
  @Column({ columnName: `Extension`, type: `varchar(255)`, default: null })
  extension?: string;
  
  @Column({ columnName: `Photo`, type: `blob`, default: null })
  photo?: Buffer;
  
  @Column({ columnName: `Notes`, type: `varchar(10000)`, default: null })
  notes?: string;
  
  @Column({ columnName: `ReportsTo`, type: `int(11)`, default: null })
  reportsTo?: number;
  
  @Column({ columnName: `PhotoPath`, type: `varchar(255)`, default: null })
  photoPath?: string;
  
  @ManyToMany(type => Territory, joinType => Employeeterritory, x => x.employeeId, x => x.territoryId)
  employeeterritories: Territory[];
  
  @OneToMany(type => Order, x => x.employeeId)
  orders: Order[];
}
