import { Column, Entity, OneToMany } from 'entitype';

import { Territory } from './territory';

@Entity('regions')
export class Region {
  
  @Column({ columnName: `RegionID`, type: `int(11)`, nullable: false, primaryKey: true, default: null })
  regionId: number;
  
  @Column({ columnName: `RegionDescription`, type: `varchar(255)`, nullable: false, default: null })
  regionDescription: string;
  
  @OneToMany(type => Territory, x => x.regionId)
  territories: Territory[];
}
