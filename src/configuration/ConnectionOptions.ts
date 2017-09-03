
export class ConnectionOptions {
  adapter: string;

  static getByName(configName: string): ConnectionOptions {
    return new ConnectionOptions();
  }
}
