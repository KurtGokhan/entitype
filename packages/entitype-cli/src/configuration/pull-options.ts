import { ConnectionOptions } from 'entitype';
export interface IPullOptions {
  output?: string;
  interactive?: boolean;
  index?: boolean;
  connection: ConnectionOptions;
}
