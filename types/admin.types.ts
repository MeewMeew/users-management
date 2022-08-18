import type { FindAllOptions } from "./user.types"

export type FindByKeysOptions = Omit<Omit<FindAllOptions, 'key'>, 'search'> 

export enum SortData {
  ASC = 'ASC',
  DESC = 'DESC',
}