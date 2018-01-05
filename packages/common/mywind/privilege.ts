import { Column, Entity, ManyToMany } from 'entitype';

import { Employee } from './employee';
import { EmployeePrivilege } from './employee-privilege';

@Entity('privileges')
export class Privilege {
  
  @Column({ columnName: `id`, type: `int(11)`, nullable: false, generated: true, primaryKey: true, default: null })
  id: number;
  
  @Column({ columnName: `privilege_name`, type: `varchar(50)`, default: null })
  privilegeName?: string;
  
  @ManyToMany(type => Employee, joinType => EmployeePrivilege, x => x.privilegeId, x => x.employeeId)
  employeePrivileges: Employee[];
}
