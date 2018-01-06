///<reference types="chai" />

declare module 'satisfy-sql' {
  function satisfySql(chai: any, utils: any): void;
  export = satisfySql;
}

declare namespace Chai {
  interface Assertion extends LanguageChains, NumericComparison, TypeComparison {
    satisfySql(expected: string | RegExp | RegExp[] | ((val: string) => boolean), message?: string): Assertion;
  }

  interface Assert {
    satisfySql(expected: string | RegExp | RegExp[] | ((val: string) => boolean), message?: string): void;
  }
}
