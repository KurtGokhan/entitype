import { Column } from 'src';

export class Model {
  @Column()
  empty: number;


  @Column().primaryKey()
  pk: number;

  @Column({ primaryKey: true })
  pk_opts: number;

  @Column().primaryKey(true)
  pk_generated: number;



  @Column().unique()
  unique_imply: string;

  @Column({ unique: true })
  unique_opts: string;

  @Column().unique(true)
  unique: string;

  @Column().unique(false)
  not_unique: string;



  @Column().nullable()
  nullable_imply?: number;

  @Column({ nullable: true })
  nullable_opts: string;

  @Column().nullable(true)
  nullable?: number;

  @Column().nullable(false)
  not_nullable: number;


  @Column().index()
  index_imply?: number;

  @Column({ index: true })
  index_opts: string;

  @Column().index(true)
  index?: number;

  @Column().index(false)
  not_index: number;



  @Column().columnName('customName')
  named: string;

  @Column('customName_param')
  named_param: string;

  @Column({ columnName: 'customName_opts' })
  named_opts: string;



  @Column().default('default-string-value')
  with_default: string;

  @Column({ default: 'default-string-value' })
  with_default_opts: string;



  @Column().type.float()
  typed: number;

  @Column().type.custom('hello', 5, 3)
  typed_custom: number;

  @Column().type('helloagain', 7, 9)
  typed_custom_implicit: number;

  @Column({ type: 'float' })
  typed_opts: number;



  @Column().columnName('customName_typed').type.float()
  typed_and_named: number;

  @Column('customName_typed_param').type.float()
  typed_and_named_param: number;

  @Column({ columnName: 'customName_typed_opts' }).type.float()
  typed_and_named_opts: number;
}
