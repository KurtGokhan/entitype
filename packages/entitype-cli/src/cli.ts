import 'reflect-metadata';

import * as vorpalBuilder from 'vorpal';

import { pull, PullOptions } from './pull';

export const vorpal = vorpalBuilder();

vorpal
  .command('pull <output>')
  .option('-i, --interactive', 'Program acts interactively and if cannot decide about something, asks the user.')
  .option('-c, --config <path>', 'Path to the config file. Looks for ".entitype-cli.json" by default.')
  .description('Reads the database structure and creates entities on the selected output directory.')
  .action(async args => {
    await pull(args as PullOptions);
  });


vorpal
  .command('push')
  .description('Creates a database structure based on the entities in the selected context.')
  .action(async args => {
    // await push();
  });


vorpal
  .delimiter('Entitype$')
  .show()
  .parse(process.argv);
