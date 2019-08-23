import { ActionCreator } from '../types'

export const createActionCreator = <P extends object, T extends string = string>(type: T): ActionCreator<T, P> =>
  (props: P) => Object.assign({ type }, props)