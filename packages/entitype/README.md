# Entitype

<!-- Badges section here. -->
[![Build Status](https://travis-ci.org/entitype/entitype.svg?branch=master)][travis-badge-url]
[![Coverage Status](https://coveralls.io/repos/github/entitype/entitype/badge.svg?branch=master)][coveralls-badge-url]

Entitype is an ORM framework that provides a strongly-typed, fluent API. You can query the database of your choice with the help of IntelliSense without having to write any SQL or any other DSL.

The project is heavily influenced by other ORM frameworks like [TypeORM][typeorm-url] and [Entity Frameork][entity-framework-url]. Its API is designed to resemble Entity Framework but also to conform to TypeScript coding conventions and make IntelliSense possible.

Entitype can be used in any JavaScript environment supporting ES6.

__This is a work in progress. By now, only the querying is completed. If you are looking for a more mature project, try [TypeORM][typeorm-url]__

## Table of Contents

* [Installation](#installation)
* [Quick Start](#quick-start)
  * [Defining a model](#defining-a-model)
  * [Defining relationships](#defining-relationships)
  * [Defining the context](#defining-the-context)
  * [Configuring the Connection](#configuring-the-connection)
  * [Querying API](#querying-api)
* [CLI](#cli)
* [Examples](#examples)

## Installation

Install the npm package with:

```bash
npm install --save entitype
```

Also install a plugin of your choice for database adapters:

```bash
npm install --save entitype-mysql
```

Enable TypeScript experimental features in your `tsconfig.json` under `compilerOptions`:

```json
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```

## Quick Start

### Defining a Model

Entitype models are just classes where the class and its properties are "decorated".

```typescript
import { Column, Entity } from 'entitype';

@Entity('customers')
export class Customer {

  @Column().type.int().primaryKey(true)
  id: number;

  @Column(`last_name`).type.varchar(50).index()
  name?: string;
}
```

### Defining Relationships

Relationships on a table are defined by putting decorators on navigation properties.

The valid navigation property decorators are `OneToOne`, `OneToMany`, `ManyToOne` and `ManyToMany`.

### Defining a One-to-Many Relationship

A *One-to-Many* relationship is defined by using `OneToMany` and `ManyToOne` decorators. For first parameter, the entity type which owns the foreign key for this relationship is passed. The second parameter is for declaring the foreign key.

```typescript
export class Customer {
  /* ........... */

  @OneToMany(type => Order, x => x.customerId)
  orders: Order[];
}

@Entity('orders')
export class Order {
  @Column().type.int().primaryKey(true)
  id: number;

  @Column(`customer_id`)
  customerId: number;

  @ManyToOne(type => Order, x => x.customerId)
  customer: Customer;
}
```

### Defining a One-to-One Relationship

A *One-to-One* relationship is a special case of *One-to-Many* relationship and is not much different. Instead of an array for property type, a singular value is used. `OneToOne` decorator is used to specify this kind of relationship.

```typescript
export class Customer {
  /* ........... */

  @OneToOne(type => Order, x => x.customerId)
  orders: Order;  // <------ Note the difference here
}

@Entity('orders')
export class Order {
  @Column().type.int().primaryKey(true)
  id: number;

  @Column(`customer_id`)
  customerId: number;

  @OneToOne(type => Order, x => x.customerId)
  customer: Customer;
}
```

### Defining a Many-to-Many Relationship

A *Many-to-Many* relationship can also be defined in Entitype. For this relationship, a mapping entity must be defined like any other entity.

```typescript
@Entity('employee_privileges_mapping_table')
export class EmployeePrivilege {

  @Column('employee_id').primaryKey()
  employeeId: number;

  @Column('privilege_id').primaryKey()
  privilegeId: number;
}
```

The entities to be mapped can be decorated with `ManyToMany` decorator using the mapping entity we defined. First parameter is for array type, second parameter is the mapping entity type. Third and fourth parameters are for left key and right key respectively.

```typescript
@Entity('employees')
export class Employee {
  /* ---- Other properties, including the primary key ----  */

  @ManyToMany(type => Privilege, joinType => EmployeePrivilege, x => x.employeeId, x => x.privilegeId)
  employeePrivileges: Privilege[];
}

@Entity('privileges')
export class Privilege {
  /* ---- Other properties, including the primary key ----  */

  @ManyToMany(type => Employee, joinType => EmployeePrivilege, x => x.privilegeId, x => x.employeeId)
  employeePrivileges: Employee[];
}

```

### Defining the Context

A context must be defined before starting using Entitype.

```typescript
import { DbCollection, EntitypeContext, IQueryable } from 'entitype';

export class MyContext extends EntitypeContext {

  @DbCollection(Customer)
  customers: IQueryable<Customer>;

  @DbCollection(Order)
  orders: IQueryable<Order>;
}

```

### Configuring the Connection

You can specify the configuration which Entitype will use to connect to database. This should be done only once in the lifecycle of your program.

Also the plugin must be imported atleast once to resolve dependencies. The plugin to be used is specified with `adapter` property of the options object. Plugins are conventionally named `entitype-[pluginName]`.

```typescript
import { useConfiguration } from 'entitype';
import { MysqlConnectionOptions } from 'entitype-mysql';

useConfiguration(<MysqlConnectionOptions>{
  adapter: 'mysql',
  database: 'mydb',
  host: 'localhost',
  port: 3306,
  password: '*********',
  user: 'root'
})
```

### Querying API

The query interface of Entitype will be available over the context class. The IntelliSense holds your hand as you write a query so it will be quite easy to get the grasp of the API.

Firstly, create an instance of the context:

```typescript
let ctx = new MyContext();
```

Query all customers:

```typescript
let customers = await ctx.customers.toList();
```

Query only the name of the first customer:

```typescript
// name is of type 'string'
let name = await ctx.customers
  .select(x => x.name)
  .first();
```

Query methods return a Promise as result so it can be used with `await` keyword. The result can also be used with `then` if you are not able to use *async/await* feature:

```typescript
ctx.customers
  .select(x => x.name)
  .first()
  .then(name => console.log(`My first customer's name is ` + name));
```

Query the names of all the customers:

```typescript
// names is of type 'string[]'
let names = await ctx.customers
  .select(x => x.name)
  .toList();
```

Navigation properties can also be queried. Query name and orders of all customers;

```typescript
// namesAndOrders is of type '{ name: string, orders: Order[] }'
let namesAndOrders = await ctx.customers
  .select(x => ({name: x.name, orders: x.orders }))
  .toList();
```

A combined where query:

```typescript
let customers = await ctx.customers
  .where(x => x.name).not.isNull()
  .or
  .where(x => x.id).in([5,6,7])
  .toList();
```

Order customers by their name, take first 10 after skipping first 5:

```typescript
let customerNamesOrdered = await ctx.customers
  .orderByAscending(x => x.name)
  .skip(5)
  .take(10)
  .toList();
```

By tefault, navigation properties are not loaded if they are not referenced in any part of the query. Explicitly specify an include statement to load them:

```typescript
let customerNamesOrdered = await ctx.customers
  .include(x => x.orders)
  .toList();
```

## CLI

[Entitype-CLI][entitype-cli-url] is a tool that provides utilities like automatically creating models from database, or doing migrations.

## Examples

More examples can be found in the [integration test repository][entitype-integration-tests-url].

[travis-badge-url]: https://travis-ci.org/entitype/entitype
[coveralls-badge-url]: https://coveralls.io/github/entitype/entitype?branch=master
[entitype-url]: https://github.com/entitype/entitype
[entitype-cli-url]: https://github.com/entitype/entitype-cli
[entitype-integration-tests-url]: https://github.com/entitype/entitype-integration-tests
[typeorm-url]: https://github.com/typeorm/typeorm
[entity-framework-url]: https://github.com/aspnet/EntityFramework6
