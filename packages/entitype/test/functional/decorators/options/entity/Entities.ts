import { Entity } from '../../../../../src';

@Entity()
export class ImplicitlyNamedModel {
}

@Entity().tableName('TableName')
export class NamedModel {
}

@Entity('ModelNamedWithOpts')
export class NamedModelOpts {
}

@Entity('ModelNamedWithParams')
export class NamedModelParams {
}
