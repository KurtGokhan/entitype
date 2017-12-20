# Entitype Integration tests

[![Build Status](https://travis-ci.org/entitype/entitype-integration-tests.svg?branch=master)](https://travis-ci.org/entitype/entitype-integration-tests)

## Running Tests

A config file `test/config.json` can be created like following.

``` json

{
  "$schema": "../node_modules/entitype-mysql/schema.json",
  "adapter": "mysql",
  "host": "localhost",
  "port": 3306,
  "database": "test",
  "user": "root",
  "password": "*********"
}

```

Alternatively, following environment variables must be defined. Environment variables overrides the config file.

- DB_ADAPTER
- DB_NAME
- DB_USER
- DB_PASSWORD
- DB_HOST
- DB_PORT

## Database Model

Northwind database is used for tests.

Thanks to [MyWind](https://github.com/dalers/mywind) for MySQL scripts for Northwind database.
