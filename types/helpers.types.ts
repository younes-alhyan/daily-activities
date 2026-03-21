export type Prop<Key extends string, T> = T extends null
  ? object
  : { [K in Key]: T };

export type Func<ArgsT, ReturnT> = ArgsT extends null
  ? () => ReturnT
  : (args: ArgsT) => ReturnT;

export type NullMerge<A, B> = A extends null
  ? B extends null
    ? null
    : B
  : B extends null
    ? A
    : A & B;
