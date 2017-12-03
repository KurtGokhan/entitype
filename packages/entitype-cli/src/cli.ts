import 'reflect-metadata';

import * as vorpalBuilder from 'vorpal';

import { getConfiguration } from './configuration';
import { pull } from './pull';

export const vorpal = vorpalBuilder();

vorpal
  .command('pull [output]')
  .option('-i, --interactive', 'Program acts interactively and if cannot decide about something, asks the user.')
  .option('-c, --config <path>', 'Path to the config file. Looks for "[config/].entitype-cli.json" by default.')
  .option('-x, --index', 'Create index.ts file that exports all the models.')
  .description('Reads the database structure and creates entities on the selected output directory.')
  .action(wrapErrorHandler(pullHandler));


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


function wrapErrorHandler<T extends (void | PromiseLike<any>)>(fn: (args) => T): CommandActionFn<T> {
  return function (args, ...others) {
    let result = fn(args);

    if (result['then']) {
      return (result as PromiseLike<any>).then(null, err => {
        vorpal.activeCommand.log(err.message);
        return null;
      });
    }

    return undefined;
  };
}

type PullCliOptions = {
  options: {
    interactive?: boolean;
    config?: string;
    index?: boolean;
  };
  output: string;
};

async function pullHandler(args: PullCliOptions) {
  let fileConfig = await getConfiguration(args.options.config);

  if (!fileConfig)
    throw new Error('The configuration file could not be found. Please specify a configuration file.');

  let outputOption = args.output == null ? {} : { output: args.output };
  let options = Object.assign({}, fileConfig.pull, args.options, outputOption);

  if (options.output == null)
    throw new Error('An output path must be specified.');

  await pull(options, vorpal.activeCommand.prompt.bind(vorpal.activeCommand));
}
