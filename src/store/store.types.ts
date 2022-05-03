export type ActionType<T> = T extends { [key: string]: infer U } ? U : never;
export type ActionsType<T> = T extends { [key: string]: (...args: any) => any }
  ? T
  : never;
