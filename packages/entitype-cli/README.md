# Entitype CLI

CLI for [Entitype][entitype-url] projects, which can be used to do database synchronization with migrations, code-first or database-first style.

__This is a work in process. By now, only the `pull` command, a.k.a. database-first synchronization, is completed.__


## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Configuration](#configuration)
* [Creating models from database - Database first style](#creating-models-from-database)
* [Programmatic API Usage](#programmatic-usage)
* [License](#license)

## Installation

```bash
npm install -g entitype-cli
```

## Usage

```bash
entitype help
```

## Configuration

All commands has flags that can be used for configuration.
In addition to these flags, `-c` flag can be used to specify the file path for a configuration file. If not specified, the CLI will look for a file named `.entitype-cli.json` under the working directory or `config` directory.
The structure of a configuration file looks like:

```json
{
  "$schema": "https://raw.githubusercontent.com/entitype/entitype/master/packages/entitype-cli/schema.json",
  "pull": {
    "output": "output",
    "index": true,
    "interactive": false,
    "connection": {
      "adapter": "mysql",
      "database": "northwind",
      "host": "localhost",
      "port": 3306,
      "password": "********",
      "user": "root"
    }
  }
}
```

## Creating models from database

```bash
entitype pull [options] [output]
```

Reads the database structure and creates entities on the selected output directory.

The output parameter can be an absolute or relative directory path. The models will be created on this directory.

Options:

* `--help`               output usage information
* `-i, --interactive`    Program acts interactively and if cannot decide about something, asks the user.
* `-c, --config <path>`  Path to the config file. Looks for `[config/].entitype-cli.json` by default.
* `-x, --index`          Create index.ts file that exports all the models.

## Programmatic API Usage

The CLI Api can be called from javascript code.

```typescript
import { pull } from 'entitype-cli';

pull({
  output: './models',
  connection: { /* Rest of configuration*/ }
});

```

## License

MIT

[entitype-url]: https://github.com/entitype/entitype
