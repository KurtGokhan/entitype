import { Column, Entity } from 'entitype';


@Entity('employeeterritories')
export class Employeeterritory {
  
  @Column({ columnName: `EmployeeID`, type: `int(11)`, nullable: false, primaryKey: true, default: null })
  employeeId: number;
  
  @Column({ columnName: `TerritoryID`, type: `varchar(255)`, nullable: false, primaryKey: true, default: null })
  territoryId: string;
}
