import { Column, Entity, OneToMany } from 'entitype';

import { InventoryTransaction } from './inventory-transaction';

@Entity('inventory_transaction_types')
export class InventoryTransactionType {
  
  @Column({ columnName: `id`, type: `tinyint(4)`, nullable: false, primaryKey: true, default: null })
  id: number;
  
  @Column({ columnName: `type_name`, type: `varchar(50)`, nullable: false, default: null })
  typeName: string;
  
  @OneToMany(type => InventoryTransaction, x => x.transactionType)
  inventoryTransactions: InventoryTransaction[];
}
