import 'reflect-metadata';
import 'rxjs/Rx';

import * as dotenv from 'dotenv';
import * as vorpal from 'vorpal';

dotenv.config();


export const apiPath = process.env.API_URL;
export const username = process.env.JUDGE_USERNAME;
export const password = process.env.JUDGE_PASSWORD;
export const fetchInterval = +process.env.FETCH_INTERVAL || 1000;

export const vorpalBuilder = vorpal();


vorpalBuilder
  .command('pull')
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
  .show();
