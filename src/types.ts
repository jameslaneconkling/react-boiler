import { Action } from "redux";


/* redux */
export type ActionWithProps<Type, Props> = Action<Type> & { props: Props }
export type ActionCreator<Type, Props> = (props: Props) => ActionWithProps<Type, Props>


/* misc */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type Nullable<T> = { [P in keyof T]: T[P] | null }
