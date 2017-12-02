# Entitype CLI

CLI for Entitype projects, which can be used to do database synchronization with migrations, code-first or database-first style.

__This is a work in process. By now, only the `pull` command, a.k.a. database-first synchronization, is completed.__

<!-- Badges section here. -->
[![Build Status](https://travis-ci.org/KurtGokhan/entitype-cli.svg?branch=master)][travis-badge-url]


## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Creating models from database - Database first style](#creating-models-from-database)

## Installation

```bash
npm install -g entitype-cli
```

## Usage

```bash
entitype help
```

### Creating models from database

```bash
entitype pull [options] <output>
```

Reads the database structure and creates entities on the selected output directory.

The output parameter can be an absolute or relative directory path. The models will be created on this directory.

Options:

* `--help`               output usage information
* `-i, --interactive`    Program acts interactively and if cannot decide about something, asks the user.
* `-c, --config <path>`  Path to the config file. Looks for `[config/].entitype-cli.json` by default.
* `-x, --index`          Create index.ts file that exports all the models.

## License

MIT


[travis-badge-url]: https://travis-ci.org/KurtGokhan/entitype-cli
