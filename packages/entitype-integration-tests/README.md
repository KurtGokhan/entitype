# Running Tests

A config file `test/config.json` must be created like following:

``` json

{
  "$schema": "../node_modules/entitype-mysql/schema.json",
  "adapter": "mysql2",
  "host": "localhost",
  "port": 3306,
  "database": "test",
  "user": "root",
  "password": "*********"
}

```
