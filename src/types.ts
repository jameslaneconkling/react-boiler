import { Action } from "redux";


/* redux */
export type ActionCreator<Type extends string, Props extends object> = (props: Props) => Action<Type> & Props


/* misc */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type Nullable<T> = { [P in keyof T]: T[P] | null }
