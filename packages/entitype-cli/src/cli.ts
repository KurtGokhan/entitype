import 'reflect-metadata';
import * as Rx from 'rxjs/Rx';

import * as dotenv from 'dotenv';
import * as vorpal from 'vorpal';

dotenv.config();

export const vorpalBuilder = vorpal();

vorpalBuilder
  .command('pull')
  .option('-i, --interactive', 'Program acts interactively and if cannot decide about something, asks the user.')
  .description('Reads the database structure and creates entities on the selected output directory.')
  .action(function (args, callback) {
    this.log('Started judgings');
    callback();
  });


vorpalBuilder
  .command('push')
  .description('Creates a database structure based on the entities in the selected context.')
  .action(function (args, callback) {
    this.log('Stopped judgings');
    callback();
  });


export const vorpalInstance = vorpalBuilder
  .delimiter('Entitype$')
  .show()
  .parse(process.argv);
