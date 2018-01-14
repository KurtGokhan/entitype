# Active Record

```typescript

let ctx = new Context().activeRecord();

```

## Update

Updating can be done by making changes on an active record object and calling `saveChanges` on the context.

```typescript

let customer = ctx.customers.first();
customer.name = 'Mohammed Ali';

await ctx.saveChanges();

```

## Insert

Add command adds a new entry to the context and to the database on context save. It activates the object.

```typescript

let customer = new Customer();
customer.name = 'Mohammed Ali';

ctx.customers.add(customer);
await ctx.saveChanges();

```

## Persist

Persist command persists changes to an existing entry, or adds a new entry if entry does not exist. It saves changes to all defined properties to the object and also makes the object an active record.

To fully overwrite a record:

```typescript

let customer = new Customer();
customer.id = 5;
customer.name = 'Mohammed Ali';

ctx.customers.persist(customer);
await ctx.saveChanges();

```

To partially overwrite a record:

```typescript

let customer = { id: 5, name: 'Mohammed Ali' };

ctx.customers.persist(customer);
await ctx.saveChanges();

```

If the persisted object is not an instance of the entity type, it will not be made an active record.
