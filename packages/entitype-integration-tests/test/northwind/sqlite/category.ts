import { Column, Entity, OneToOne } from 'entitype';

import { Product } from './product';

@Entity('categories')
export class Category {
  
  @Column({ columnName: `CategoryID`, type: `int(11)`, nullable: false, generated: true, primaryKey: true, default: null })
  categoryId: number;
  
  @Column({ columnName: `CategoryName`, type: `varchar(255)`, default: null })
  categoryName?: string;
  
  @Column({ columnName: `Description`, type: `varchar(255)`, default: null })
  description?: string;
  
  @Column({ columnName: `Picture`, type: `blob`, default: null })
  picture?: Buffer;
  
  @OneToOne(type => Product, x => x.productId)
  productsReference: Product;
}
