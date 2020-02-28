import {PersonProperties} from './PersonProperties';

export class FilterSortPersonParams {
  ps: PersonProperties;
  pf: PersonProperties;
  value: string;
  desc: boolean;

  constructor(init: Partial<FilterSortPersonParams>) {
    Object.assign(this, init);
  }
}
