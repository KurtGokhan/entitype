import { Column, Entity, ManyToMany, ManyToOne } from 'entitype';

import { Employee } from './employee';
import { Employeeterritory } from './employeeterritory';
import { Region } from './region';

@Entity('territories')
export class Territory {
  
  @Column({ columnName: `TerritoryID`, type: `varchar(255)`, nullable: false, primaryKey: true, default: null })
  territoryId: string;
  
  @Column({ columnName: `TerritoryDescription`, type: `varchar(255)`, nullable: false, default: null })
  territoryDescription: string;
  
  @Column({ columnName: `RegionID`, type: `int(11)`, nullable: false, default: null, index: true })
  regionId: number;
  
  @ManyToMany(type => Employee, joinType => Employeeterritory, x => x.territoryId, x => x.employeeId)
  employeeterritories: Employee[];
  
  @ManyToOne(type => Territory, x => x.regionId)
  region: Region;
}
