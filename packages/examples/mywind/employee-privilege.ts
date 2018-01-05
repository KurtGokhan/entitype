import { Column, Entity } from 'entitype';


@Entity('employee_privileges')
export class EmployeePrivilege {
  
  @Column({ columnName: `employee_id`, type: `int(11)`, nullable: false, primaryKey: true, default: null })
  employeeId: number;
  
  @Column({ columnName: `privilege_id`, type: `int(11)`, nullable: false, primaryKey: true, default: null })
  privilegeId: number;
}
