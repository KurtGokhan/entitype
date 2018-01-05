# Entitype

<!-- Badges section here. -->
[![Build Status][travis-badge-image]][travis-badge-url]
[![Coverage Status][coveralls-badge-image]][coveralls-badge-url]
[![Dependencies][dependencies-badge-image]][dependencies-badge-url]
[![Chat][chat-badge-image]][chat-badge-url]

Entitype is an ORM framework that provides a strong-typed, fluent programming interface. You can query the database of your choice with the help of IntelliSense without having to write any SQL or any other DSL.

The project is heavily influenced by other ORM frameworks like [TypeORM][typeorm-url] and [Entity Frameork][entity-framework-url]. Its API is designed to resemble Entity Framework but also to conform to TypeScript coding conventions and make IntelliSense possible.

Entitype can be used in any JavaScript environment supporting ES6.

__This is a work in progress. By now, only the querying is completed. If you are looking for a more mature project, try [TypeORM][typeorm-url].__

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

[Select a plugin][entitype-plugins-url] for database adapters and install it as well:

```bash
npm install --save entitype-mysql
```

## Quick Start

### Defining a Model

Entitype models are classes where the class and its properties are "decorated".

<details>
<summary>
Example
</summary>

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

</details>

### Defining Relationships

Relationships on a table are defined by putting decorators on navigation properties.

The valid navigation property decorators are `OneToOne`, `OneToMany`, `ManyToOne` and `ManyToMany`.

### Defining a One-to-Many Relationship

A *One-to-Many* relationship is defined by using `OneToMany` and `ManyToOne` decorators. For first parameter, the entity type which owns the foreign key for this relationship is passed. The second parameter is for declaring the foreign key.

<details>
<summary>
Example
</summary>

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

</details>

### Defining a One-to-One Relationship

A *One-to-One* relationship is a special case of *One-to-Many* relationship and is not much different. Instead of an array for property type, a singular value is used. `OneToOne` decorator is used to specify this kind of relationship.

<details>
<summary>
Example
</summary>

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

</details>

### Defining a Many-to-Many Relationship

A *Many-to-Many* relationship can also be defined in Entitype. For this relationship, a mapping entity must be defined like any other entity.

<details>
<summary>
Example
</summary>

```typescript
@Entity('employee_privileges_mapping_table')
export class EmployeePrivilege {

  @Column('employee_id').primaryKey()
  employeeId: number;

  @Column('privilege_id').primaryKey()
  privilegeId: number;
}
```

</details>

The entities to be mapped can be decorated with `ManyToMany` decorator using the mapping entity defined above. First parameter is for array type, second parameter is the mapping entity type. Third and fourth parameters are for left key and right key respectively.

<details>
<summary>
Example
</summary>

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

</details>

### Defining the Context

A context must be defined before starting using Entitype.

<details>
<summary>
Example
</summary>

```typescript
import { DbCollection, EntitypeContext, IQueryable } from 'entitype';

export class MyContext extends EntitypeContext {

  @DbCollection(() => Customer)
  customers: IQueryable<Customer>;

  @DbCollection(() => Order)
  orders: IQueryable<Order>;
}

```

</details>

### Configuring the Connection

You can specify the configuration which Entitype will use to connect to database. This must be done only once in the lifecycle of your program.

Also the plugin must be imported atleast once to resolve dependencies. The plugin to be used is specified with `adapter` property of the options object. Plugins are conventionally named `entitype-[pluginName]`.

<details>
<summary>
Example
</summary>

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

</details>

### Querying API

The query interface of Entitype will be available over the context class. The IntelliSense helps along while writing a query so the queries can be written like a native language.

Firstly, create an instance of the context:

```typescript
let ctx = new MyContext();
```

<details>
<summary>
Query all customers:
</summary>

```typescript
let customers = await ctx.customers.toList();
```

</details>

<details>
<summary>
Query only the name of the first customer:
</summary>

```typescript
// name is of type 'string'
let name = await ctx.customers
  .select(x => x.name)
  .first();
```

</details>

<details>
<summary>
Query methods return a Promise as result so it can be used with `await` keyword. The result can also be used with `then` if you are not able to use *ES7 await* feature:
</summary>

```typescript
ctx.customers
  .select(x => x.name)
  .first()
  .then(name => console.log(`My first customer's name is ` + name));
```

</details>

<details>
<summary>
Query the names of all the customers:
</summary>

```typescript
// names is of type 'string[]'
let names = await ctx.customers
  .select(x => x.name)
  .toList();
```

</details>

<details>
<summary>
Navigation properties can also be queried. Query name and orders of all customers;
</summary>

```typescript
// namesAndOrders is of type '{ name: string, orders: Order[] }'
let namesAndOrders = await ctx.customers
  .select(x => ({name: x.name, orders: x.orders }))
  .toList();
```

</details>

<details>
<summary>
A combined where query:
</summary>

```typescript
let customers = await ctx.customers
  .where(x => x.name).not.isNull()
  .or
  .where(x => x.id).in([5,6,7])
  .toList();
```

</details>

<details>
<summary>
Order customers by their name, take first 10 after skipping first 5:
</summary>

```typescript
let customerNamesOrdered = await ctx.customers
  .orderByAscending(x => x.name)
  .skip(5)
  .take(10)
  .toList();
```

</details>

<details>
<summary>
By tefault, navigation properties are not loaded if they are not referenced in any part of the query. Explicitly specify an include statement to load them:
</summary>

```typescript
let customerNamesOrdered = await ctx.customers
  .include(x => x.orders)
  .toList();
```

</details>

## CLI

[Entitype-CLI][entitype-cli-url] is a tool that provides utilities like automatically creating models from database, or doing migrations.

## Examples

* [Angular example app][entitype-angular-example-url] using WebSQL adapter.
* [React example app][entitype-react-example-url] using WebSQL adapter.

[travis-badge-image]: https://travis-ci.org/entitype/entitype.svg?branch=master
[travis-badge-url]: https://travis-ci.org/entitype/entitype
[coveralls-badge-image]: https://coveralls.io/repos/github/entitype/entitype/badge.svg?branch=master
[coveralls-badge-url]: https://coveralls.io/github/entitype/entitype?branch=master
[dependencies-badge-image]: https://david-dm.org/entitype/entitype.svg
[dependencies-badge-url]: https://david-dm.org/entitype/entitype
[chat-badge-image]: https://badges.gitter.im/entitype/entitype.svg
[chat-badge-url]: https://gitter.im/entitype/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge

[entitype-url]: https://github.com/entitype/entitype
[entitype-cli-url]: https://github.com/entitype/entitype/tree/master/packages/entitype-cli
[typeorm-url]: https://github.com/typeorm/typeorm
[entity-framework-url]: https://github.com/aspnet/EntityFramework6
[entitype-plugins-url]: https://www.npmjs.com/search?q=entitype

[entitype-angular-example-url]: https://stackblitz.com/edit/angular-entitype-demo?file=demo.ts
[entitype-react-example-url]: https://stackblitz.com/edit/react-entitype-demo?file=demo.tsx
