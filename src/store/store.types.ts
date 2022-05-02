export type ActionType<T> = T extends { [key: string]: infer U } ? U : never;
